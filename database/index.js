const mongoose = require('mongoose');
mongoose.connect('mongodb://ec2-54-193-249-216.us-west-1.compute.amazonaws.com:3001/reservation_service', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error')
});
db.once('open', () => {
  console.log('mongoose connected succesfully');
});

module.exports = db;