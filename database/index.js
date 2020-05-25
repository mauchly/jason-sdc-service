const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reservation_service', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error')
});
db.once('open', () => {
  console.log('mongoose connected succesfully');
});

module.exports = db;