let faker = require ('faker');
let fs = require('fs');
const EventEmitter = require('events').EventEmitter.defaultMaxListeners = 1000;
let Path = require('path');
let price = faker.commerce.price(100,180.00,2);

let listingTableData = `id, listingId, pricePerNight, weekend, weekendPrice, maxGuests, tax\n`;
let bookingTableData = `id, listingId, nights, month, checkIn, checkOut, guests, children, infants\n`;
let arrOfCalendarDays = [];
let numOfListings = 10000;
let currentListingId = 1;
let id = 1;

let toFillListingItemsTable = function (currentListingId) {
  let listingId = currentListingId;
  let weekend;
 //set random number to set max num of Guests
  for (let i = 0; i < numOfListings; i++) {
   //random price using Faker npm package
    let pricePerNight = faker.commerce.price(100, 180.00, 2); //range between 100 - 180
    //random value to get weekend variable either true or false
    let random = Math.floor(Math.random() * 10);
    let maxGuests = Math.floor(Math.random() * 3 + 2);
    //setup boolean for if weekend price is applicable
    if (random % 2 === 0) {
      weekend = 'false';
    } else {
      weekend = 'true';
    }
    listingTableData += `${listingId}, ${listingId}, ${pricePerNight}, ${weekend}, 1.1, ${maxGuests}, 1.12\n`;
    listingId++;
  }
};

// to fill the arr with days of 4 months starting April - July //April [30 days], May[31 days], etc
let makeCalendarDays = function() {
  let num;
  let isTrue = true;

  while (arrOfCalendarDays.length === 0 || arrOfCalendarDays.length < 125) {
    if (isTrue) {
      num = 30;
    } else {
      num = 31;
    }
  for (let i = 1; i <= num; i++) {
    arrOfCalendarDays.push(i);
  }
  //alternating between 30 days and 31 days
    isTrue = !isTrue;

  }
};

//invoke makeCalendarDays to fill the arrOfCalendarDays variable
makeCalendarDays();

//function to check current month for start date and end date
let checkWhichMonth = function (acum) {
  let month;
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

let setUpSixBookingsPerListing = function (arr, listingId) {
  let mysqlQueriesForEachListingItem = '';
  let acum = 0;
  //adding 6 bookings per item
  for (i = 0; i < 6; i++) {
    let days = Math.floor(Math.random() * 4 + 2);
    let rangeInBetween = Math.floor(Math.random() * 9 + 4 );
    let guests = Math.floor(Math.random() * 2 + 1 );
    start = arr[rangeInBetween + acum];
    end = arr[days + rangeInBetween + acum];
    let startMonth = checkWhichMonth(acum + rangeInBetween);
    let checkInDate = `${startMonth}-${start}`;
    let endMonth = checkWhichMonth(days + rangeInBetween + acum);
    let checkOutDate =  `${endMonth}-${end}`;
    acum += days + rangeInBetween;
    let startMonthSliced = startMonth.slice(0, 2);

    let eachQuery = `${id}, ${listingId}, ${days}, '${startMonthSliced}', '${checkInDate}', '${checkOutDate}', ${guests}, 0, 0\n`;

    mysqlQueriesForEachListingItem += eachQuery;
    id++;
  }
  return mysqlQueriesForEachListingItem;
};


let toFillBookingsTable = function (arr, listingId) {
  for (let i = 0; i < numOfListings; i++) {
    bookingTableData += setUpSixBookingsPerListing(arr, listingId);
    listingId++;
  }
};

let myWriteStream = fs.createWriteStream(Path.join(__dirname, '..', '/listingInfoCSV'));
let bookingsStream = fs.createWriteStream(Path.join(__dirname, '..', '/bookingsInfoCSV'));

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