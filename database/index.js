// MySQL config

// const mysql = require('mysql');
// const mysqlConfig = require('./config.js');

// const connection = mysql.createConnection(mysqlConfig);

////////////////////////////////////////////////////////////////

//postgreSQL Config

// const { Client } = require('pg');
// const client = new Client({
//   user: 'jasonjacob',
//   host: 'localhost',
//   password: '',
//   database: 'reservation_service'
// });

// client.connect();

// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message);
//   client.end();
// });

////////////////////////////////////////////////////////////////////////////////////

// MongoDB Config

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/reservation_service', { useNewUrlParser: true, useUnifiedTopology: true });

let listingItemsSchema = new Schema({
  id: Number,
  listingId: Number,
  pricePerNight: Number,
  weekend: Boolean,
  weekendPrice: Number,
  maxGuests: Number,
  tax: Number
});

let bookingsSchema = new Schema({
  id: Number,
  listingId: Number,
  nights: Number,
  month: String,
  checkIn: String,
  checkOut: String,
  guests: Number,
  children: Number,
  infants: Number
});

let listingItems = mongoose.model('listingItems', listingItemsSchema);
let bookings = mongoose.model('bookings', bookingsSchema);


//////////////////////////////////////////////////////////////////////////////

const getListingInfo = (listingId, callback) => {
  var queryStr = `Select * from listingItems Where listingId=${listingId};`

  connection.query(queryStr, (err, results) => {
    if (err) {
      callback(err, null);
      console.log('err from db')
    } else {
      callback(null, results);
      ('success from db')
    }
  })
}

const getBookedDates = (listingId, callback) => {
  var queryStr = `Select * from bookings Where listingId=${listingId};`
  connection.query(queryStr, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  })
}

const createListingInfo = (listingInfo) => {
  return new Promise((resolve, reject) => {
    let insertQuery = `INSERT INTO listingItems ('listingId', 'pricePerNight', 'weekend', 'weekendPrice', 'maxGuests', 'tax') VALUES ('${listingInfo[listingId]}', '${listingInfo[pricePerNight]}', '${listingInfo[weekend]}', '${listingInfo[weekendPrice]}', '${listingInfo[maxGuests]}', '${listingInfo[tax]}')`;
    connection.query(insertQuery, (err, results) => {
      if (err) {
        reject(err);
      } else {
        console.log('INSERT SUCCESSFUL');
        resolve(results);
      }
    });
  });
};

const updateListingInfo = (update) => {
  let keys = Object.keys(update);
  let updateQuery = '';

  for (let i = 0; i < keys.length; i++) {
    if (i === keys.length - 1) {
        updateQuery += `${keys[i]} = update[${keys[i]}]`;
    } else {
        updateQuery += `${keys[i]} = update[${keys[i]}], `;
    }
  }

  return new Promise((resolve, reject) => {
    let updateStr = `UPDATE listingItems SET ${updateQuery}`;
    connection.query(updateStr, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const deleteListing = (listingId) => {
  return new Promise((resolve, reject) => {
    let deleteQuery = `DELETE FROM listingItems WHERE listingId = ${listingId}`;
    connection.query(deleteQuery, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};


module.exports = {
  getListingInfo, getBookedDates, createListingInfo, updateListingInfo, deleteListing
}