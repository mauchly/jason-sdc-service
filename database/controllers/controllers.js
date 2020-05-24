const db = require('../index.js');
const { ListingItems, Bookings } = require('../models/models.js');

const getListingInfo = (listingId) => {
  // console.log('listingId', listingId)
  return new Promise((resolve, reject) => {
    console.log('skdkf', ListingItems);
    console.log('kjlkj', Bookings);
    ListingItems.find({id: listingId})
    .then((results) => {
      console.log('results', results);
      resolve(results);
    })
    .catch((err) => {
      console.log('error', err)
      reject(err);
    });
  });
};

const getBookedDates = (listingId) => {
  return new Promise((resolve, reject) => {
    Bookings.find({listingId: listingId})
    .then((results) => {
      // console.log('results', results);
      resolve(results);
    })
    .catch((err) => {
      console.log('error', err)
      reject(err);
    });
  });
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
};
