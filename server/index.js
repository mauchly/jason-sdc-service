const express = require('express');
const app = express();
const PORT = 3001;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const { connection, getListingInfo, getBookedDates, createListingInfo, updateListingInfo, deleteListing } = require ('../database/controllers/controllers.js');
const fs = require('fs');
const fullPath = '/Users/jasonjacob/Desktop/seniorProjects/sdc/jason-sdc-service/client/dist/index.html';

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/listingInfo', (req, res) => {
  var reqId = req.query.listingId //.listingId;
  // console.log('reqID', reqId)
  getListingInfo(reqId)
  .then((results) => {
    let stringifyResults = JSON.stringify(results);
    // console.log('RESULTS: ', results, 'STRINGIFIED RESULTS', stringifyResults);
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
  let update = req.body.listingInfo;
  update = JSON.parse(update);
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

app.get('/getBookedDates', (req, res) => {
  var listingId = req.query.listingId;
  // console.log('listingId', listingId);
  getBookedDates(listingId)
  .then((results) => {
    // console.log(results);
    var stringifyResults = JSON.stringify(results);
     res.status(202).end(stringifyResults);
  })
  .catch((err) => {
    console.log('getBookedDates', err);
    res.status(404).end('NOT FOUND');
  });
});


app.get('/:id', (req, res) => {
  // Gives listingId back to client when page first renders
  res.sendFile(fullPath);
});

app.listen(PORT, () => {
  console.log(`server listening at ${PORT}`)
});


module.exports = app;


