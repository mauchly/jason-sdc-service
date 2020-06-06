const mongoose = require('mongoose');
mongoose.connect('mongodb://root:mongoPassword@ec2-18-144-25-101.us-west-1.compute.amazonaws.com:27017/reservation_service', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error')
});
db.once('open', () => {
  console.log('mongoose connected succesfully');
});

module.exports = db;