const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

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
  connection, getListingInfo, getBookedDates, createListingInfo, updateListingInfo, deleteListing
}