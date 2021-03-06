require('newrelic');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Path = require('path');
const { connection, getListingInfo, getBookedDates, createListingInfo, updateListingInfo, deleteListing } = require ('../database/controllers/controllers.js');
const fs = require('fs');
const fullPath = '/Users/jasonjacob/Desktop/seniorProjects/sdc/jason-sdc-service/client/dist/index.html';
const redis = require('redis');
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);

client.on('error', (err) => {
  console.log('error, ', err);
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(Path.join(__dirname, '/../client/dist')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const listingInfoCache = (req, res, next) => {
  let { listingId } = req.query;
  client.get(`listingInfo${listingId}`, (err, results) => {
    if (err) {
      console.log('error', err);
    }
    if (results !== null) {
      // console.log('serving cached listingInfo data...');
      res.status(200).end(results);
    } else {
      next();
    }
  });
};

const getBookedDatesCache = (req, res, next) => {
  let { listingId } = req.query;
  client.get(`getBookedDates${listingId}`, (err, results) => {
    if (err) {
      console.log('error', err);
    }
    if (results !== null) {
      // console.log('serving cached getBookedDates data...');
      res.status(200).end(results);
    } else {
      next();
    }
  });
};

app.get('/listingInfo', listingInfoCache, (req, res) => {
  console.log('fetching listingInfo...');
  var reqId = req.query.listingId
  // console.log('reqID', reqId);
  getListingInfo(reqId)
  .then((results) => {
    let stringifyResults = JSON.stringify(results);
    // console.log('RESULTS: ', results, 'STRINGIFIED RESULTS', stringifyResults);
    client.setex(`listingInfo${reqId}`, 86400, stringifyResults);
    res.status(200).end(stringifyResults);
  })
  .catch((err) => {
    res.status(404).end('NOT FOUND');
    console.log('err', err);
  });
});

app.post('/listingInfo', (req, res) => {
  let listingInfo = req.body.listingInfo;
  listingInfo = JSON.parse(listingInfo);
  createListingInfo(listingInfo)
  .then((results) => {
    let stringifiedResults = JSON.stringify(results);
    res.status(200).end(stringifiedResults);
  })
  .catch((err) => {
    console.log('error', err);
    res.status(404).end('NOT CREATED');
  });
})

app.put('/listingInfo', (req, res) => {
  let update = req.body;
  // update = JSON.parse(update);
  // console.log('put update', update);
  updateListingInfo(update)
  .then((results) => {
    let stringifiedResults = JSON.stringify(results);
    res.status(200).end(stringifiedResults);
  })
  .catch((err) => {
    console.log('error', err);
    res.status(404).end('NOT UPDATED');
  });
});

app.delete('/listingInfo', (req, res) => {
  let listingId = req.body.listingId;
  console.log('listingId', listingId);
  deleteListing(listingId)
  .then((results) => {
    let stringifiedResults = JSON.stringify(results);
    res.status(200).end(stringifiedResults);
  })
  .catch((err) => {
    console.log('error', err);
    res.status(404).end('NOT DELETED');
  });
});

app.get('/getBookedDates', getBookedDatesCache, (req, res) => {
  console.log('fetching booked dates...');
  var listingId = req.query.listingId;
  // console.log('listingId', listingId);
  getBookedDates(listingId)
  .then((results) => {
    // console.log('getBookedDates results', results);
    var stringifyResults = JSON.stringify(results);
    client.setex(`getBookedDates${listingId}`, 86400, stringifyResults);
    res.status(200).end(stringifyResults);
  })
  .catch((err) => {
    console.log('getBookedDates error', err);
    res.status(404).end('NOT FOUND');
  });
});


app.get('/:id', (req, res) => {
  // Gives listingId back to client when page first renders
  // console.log('from /:id', req.url);
  res.sendFile(fullPath);
});

app.listen(PORT, () => {
  console.log(`server listening at ${PORT}`)
});


module.exports = app;


