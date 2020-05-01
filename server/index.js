const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const { connection, getListingInfo, getBookedDates } = require ('../database');
const fs = require('fs');
const fullPath = '/Users/yingwenchen/Desktop/HR project/HR_RPT/FEC/FEC_Yingwen_service/client/dist/index.html';

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());


app.use(express.static(__dirname + '/../client/dist'));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});


app.get('/listingInfo', (req, res) => {
  //should give listingId 10001 back to the client when page first renders
  var reqId = req.query.listingId //.listingId;
  //console.log('reqID', reqId)
  getListingInfo(reqId, (err, results) => {
    if (err) {
      res.status(404).end('NOT FOUND')
      console.log('err', err);
    } else {
      var stringifyResults = JSON.stringify(results);
      res.status(200).end(stringifyResults);
    }
  });
})


app.post('/getBookedDates', (req, res) => {
  var listingId = req.body.listingId;
  //console.log('reqbody', req.body)
  //console.log('listingId from getBookedDates', listingId)
  getBookedDates(listingId, (err, results) => {
    if (err) {
      res.status(404).end('NOT FOUND');
    } else {
      var stringifyResults = JSON.stringify(results);
     // console.log(stringifyResults)
      res.status(202).end(stringifyResults);
    }
  })

})
app.get('/:id', (req, res) => {
 // console.log('hit here', __dirname)
  //res.render(fullPath)
  fs.readFile(fullPath, 'utf8', (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.end(results);
    }
  })
})








var port = 3001;

app.listen(port, () => {
  console.log(`server listening at ${port}`)
})


module.exports = app;


