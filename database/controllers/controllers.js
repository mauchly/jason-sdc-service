const db = require('../index.js');
const { ListingItems, Bookings } = require('../models/models.js');

const getListingInfo = (listingId) => {
  // console.log('listingId', listingId)
  return new Promise((resolve, reject) => {
    ListingItems.find({id: listingId})
    .then((results) => {
      // console.log('results', results);
      resolve(results);
    })
    .catch((err) => {
      console.log('error', err)
      reject(err);
    });
  });
};

const getBookedDates = (listingId) => {
  // console.log('GBD listingId', listingId);
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
  // console.log('listingInfo', listingInfo);
  return new Promise((resolve, reject) => {
    ListingItems.create(listingInfo)
    .then((results) => {
      console.log('success from createListingInfo', results);
      resolve(results);
    })
    .catch((err) => {
      console.log('error from createListingInfo', err);
      reject(err);
    });
  });
};

const updateListingInfo = (update) => {
  return new Promise((resolve, reject) => {
    ListingItems.findOneAndUpdate({id: update.id}, update, {upsert: true})
    .then((results) => {
      console.log('success from updateListingInfo', results);
      resolve(results);
    })
    .catch((err) => {
      console.log('error from updateListingInfo');
      reject(err);
    })
  });
};

const deleteListing = (listingId) => {
  return new Promise((resolve, reject) => {
    ListingItems.findOneAndDelete({id: listingId})
    .then((results) => {
      console.log('success from deleteListing', results);
      resolve(results);
    })
    .catch((err) => {
      console.log('error from deleteListing');
      reject(err);
    });
  });
};


module.exports = {
  getListingInfo, getBookedDates, createListingInfo, updateListingInfo, deleteListing
};
