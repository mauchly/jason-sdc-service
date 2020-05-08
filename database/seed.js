var faker = require ('faker');
var fs = require('fs');
const EventEmitter = require('events').EventEmitter.defaultMaxListeners = 1000;
// const emitter = new EventEmitter();

var price = faker.commerce.price(100,180.00,2)
console.log('price', price)

var listingTableData = `id, listingId, pricePerNight, weekend, weekendPrice, maxGuests, tax\n`;
var bookingTableData = `id, listingId, nights, month, checkIn, checkOut, guests, children, infants\n`;
var arrOfCalendarDays = [];
var numOfListings = 10000;
var currentListingId = 1;
let id = 1;

var toFillListingItemsTable = function (currentListingId) {
  var listingId = currentListingId;
  var weekend;
 //set random number to set max num of Guests
  for (var i = 0; i < numOfListings; i++) {
   //random price using Faker npm package
    var pricePerNight = faker.commerce.price(100,180.00,2); //range between 100 - 180
    //random value to get weekend variable either true or false
    var random = Math.floor(Math.random() * 10);
    var maxGuests = Math.floor(Math.random() * 3 + 2);
    //setup boolean for if weekend price is applicable
    if (random % 2 === 0) {
      weekend = 'false';
    } else {
      weekend = 'true';
    }


    //add random value to set weekend as true or false
    // listingTableData += `INSERT into listingItems (listingId, pricePerNight, weekend, weekendPrice, maxGuests, tax) VALUES (${listingId}, ${pricePerNight}, ${weekend}, 1.1, ${maxGuests}, 1.12);\n `;

    listingTableData += `${listingId}, ${listingId}, ${pricePerNight}, ${weekend}, 1.1, ${maxGuests}, 1.12\n`;

    listingId++;
  }
  //return listingTableData;
};

//invoke function to populate Listing table data
// toFillListingItemsTable();

//to fill the arr with days of 4 months starting April - July //April [30 days], May[31 days], etc
var makeCalendarDays = function() {
  var num;
  var isTrue = true;

  while (arrOfCalendarDays.length === 0 || arrOfCalendarDays.length < 125) {
    if (isTrue) {
      num = 30;
    } else {
      num = 31;
    }
  for (var i = 1; i <= num; i++) {
    arrOfCalendarDays.push(i);
  }
  //alternating between 30 days and 31 days
    isTrue = !isTrue;

  }
};

//invoke makeCalendarDays to fill the arrOfCalendarDays variable
makeCalendarDays();

//function to check Which Month is it for start date and end date
var checkWhichMonth = function (acum) {
  var month;
  if (acum < 30) {
   month = '04'; //April
  } else if (acum >= 30 && acum <= 60) {
  month = '05'; //May
  } else if (acum >= 61 && acum <= 90 ) {
    month = '06'; //June
  } else if (acum >= 91 && acum <= 121 ) {
    month = '07';  //July
  }
  return month;
}

var setUpSixBookingsPerListing = function (arr, listingId) {
  var mysqlQueriesForEachListingItem = '';
  var acum = 0;
  //adding 6 bookings per item
  for (i = 0; i < 6; i++) {
    var days = Math.floor(Math.random() * 4 + 2);
    //console.log('days', days)
    var rangeInBetween = Math.floor(Math.random() * 9 + 4 );
    //console.log('rangeInBetween', rangeInBetween)
    var guests = Math.floor(Math.random() * 2 + 1 );
    start = arr[rangeInBetween + acum];
    // if (String(start).length === 1) {
    //   start =`0${start}`;
    // }

    end = arr[days + rangeInBetween + acum];
    // if (String(end).length === 1) {
    //   end =`0${end}`;
    // }

    var startMonth = checkWhichMonth(acum + rangeInBetween);
    var checkInDate = `${startMonth}-${start}`;
    var endMonth = checkWhichMonth(days + rangeInBetween + acum);
    var checkOutDate =  `${endMonth}-${end}`;
    acum += days + rangeInBetween;
    var startMonthSliced = startMonth.slice(0, 2);

    // var eachQuery = `INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (${listingId}, ${days}, '${startMonthSliced}', '${checkInDate}', '${checkOutDate}', ${guests}, 0, 0 ); \n `;

    var eachQuery = `${id}, ${listingId}, ${days}, '${startMonthSliced}', '${checkInDate}', '${checkOutDate}', ${guests}, 0, 0\n`;

    mysqlQueriesForEachListingItem += eachQuery;
    id++;
  }
//console.log('acum', acum)
  return mysqlQueriesForEachListingItem;
};

//console.log('setUpRanges', setUpSixBookingsPerListing(arrOfCalendarDays, 10000))


var toFillBookingsTable = function (arr, listingId) {

  for (var i = 0; i < numOfListings; i++) {
    bookingTableData += setUpSixBookingsPerListing(arr, listingId);
    listingId++;
  }
  // console.log('bookingTableData', bookingTableData)
};

// console.log('listingTableData', listingTableData)

var schema = `
// Postgres schema

/*  Execute this file for Postgres from the command line by typing:
 *    psql -f schema.sql -U jasonjacob reservation_service
 *  with the database already created to generate the tables. */

CREATE TABLE listingItems (
  id int NOT NULL,
  listingId int NOT NULL,
  pricePerNight DECIMAL(5, 2) NOT NULL,
  weekend boolean NOT NULL default '0',
  weekendPrice DECIMAL(3, 2) NOT NULL,
  maxGuests int NOT NULL,
  tax DECIMAL(3, 2) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE bookings (
  id int NOT NULL,
  listingId int,
  nights int,
  month VARCHAR(4),
  checkIn VARCHAR(10),
  checkOut VARCHAR(10),
  guests int,
  children int default 0,
  infants int default 0,
  PRIMARY KEY(id)
);

COPY listingItems
FROM '/Users/jasonjacob/Desktop/seniorProjects/sdc/jason-sdc-service/database/listingInfoCSV' DELIMITER ',' CSV HEADER;

COPY listingItems
FROM '/Users/jasonjacob/Desktop/seniorProjects/sdc/jason-sdc-service/database/bookingsInfoCSV' DELIMITER ',' CSV HEADER;

// mysql schema

-- DROP DATABASE IF EXISTS reservation_service;

-- CREATE DATABASE reservation_service;

-- USE reservation_service;

-- CREATE TABLE listingItems (
--   id int NOT NULL AUTO_INCREMENT,
--   listingId int NOT NULL,
--   pricePerNight DECIMAL(5, 2) NOT NULL,
--   weekend tinyint NOT NULL default 0,
--   weekendPrice DECIMAL(3, 2) NOT NULL,
--   maxGuests int NOT NULL,
--   tax DECIMAL(3, 2) NOT NULL,
--   PRIMARY KEY(id)
-- );

-- CREATE TABLE bookings (
--   id int NOT NULL AUTO_INCREMENT,
--   listingId int,
--   nights int,
--   month VARCHAR(4),
--   checkIn VARCHAR(10),
--   checkOut VARCHAR(10),
--   guests int,
--   children int default 0,
--   infants int default 0,
--   PRIMARY KEY(id)
-- );

-- LOAD DATA LOCAL INFILE '/Users/jasonjacob/Desktop/seniorProjects/sdc/jason-sdc-service/database/listingInfoCSV'
-- INTO TABLE listingItems
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;

-- LOAD DATA LOCAL INFILE '/Users/jasonjacob/Desktop/seniorProjects/sdc/jason-sdc-service/database/bookingsInfoCSV'
-- INTO TABLE bookings
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;

/*  Execute this file for mysql from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables. */

`;

var writeSchema = function (callback) {
  fs.writeFile ('../schema.sql', schema, function (err, results) {
    if (err) {
      console.log('err', err);
    } else {
      console.log('success');
    };
  });
};

// write Schema into Schema.sql file
writeSchema();

let myWriteStream = fs.createWriteStream('./database/listingInfoCSV');
let bookingsStream = fs.createWriteStream('./database/bookingsInfoCSV');

let writeListingInfoCSV = () => {
  for (let i = 0; i < 1000; i++) {
    if (i === 0) {
      toFillListingItemsTable(currentListingId);
      let write = myWriteStream.write(listingTableData);
      if (!write) {
        myWriteStream.once('drain', writeListingInfoCSV);
      } else {
        writeListingInfoCSV();
      }
    } else {
      currentListingId+= 10000;
      listingTableData = '';
      toFillListingItemsTable(currentListingId)
      let write = myWriteStream.write(listingTableData);
      if (!write) {
        myWriteStream.once('drain', writeListingInfoCSV);
      } else {
        writeListingInfoCSV();
      }
    }
  }
    myWriteStream.end();
};

let writeBookingInfoCSV = function(cb) {
  for (let i = 0; i < 1000; i++) {
    if (i === 0) {
      currentListingId = 1;
      toFillBookingsTable(arrOfCalendarDays, currentListingId);
      let write = bookingsStream.write(bookingTableData);
      if (!write) {
        bookingsStream.once('drain', writeBookingInfoCSV);
      } else {
        writeBookingInfoCSV();
      }
    } else {
      currentListingId+= 10000;
      bookingTableData = '';
      toFillBookingsTable(arrOfCalendarDays, currentListingId);
      let write = bookingsStream.write(bookingTableData);
      if (!write) {
        bookingsStream.once('drain', writeBookingInfoCSV);
      } else {
        writeBookingInfoCSV();
      }
    }
  }
  bookingsStream.end();
};

writeListingInfoCSV();
writeBookingInfoCSV();