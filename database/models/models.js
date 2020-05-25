const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

let ListingItems = mongoose.model('ListingItems', listingItemsSchema);
let Bookings = mongoose.model('Bookings', bookingsSchema);

module.exports = {
  ListingItems, Bookings
};