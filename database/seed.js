var faker = require ('faker');
var fs = require('fs');


var price = faker.commerce.price(100,180.00,2)
console.log('price', price)



var listingTableData = ``;
var bookingTableData = ``;
var arrOfCalendarDays = [];
var listingNames = [
  'Super_Cute_Retro_Airstream',
  'Redundant_Driver_Strategic_house',
  'Multibyte_Program_Opensource_house',
  'Neural_Transmitter_Magnetic_house',
  'Haptic_Bandwidth_Leadingedge_house',
  'Primary_Harddrive_Killer_house',
  'Solidstate_Harddrive_Crossplatform_house',
  'Optical_Bandwidth_Robust_house',
  'Solidstate_Interface_Crossmedia_house',
  'Bluetooth_Port_Opensource_house',
  'Neural_Program_Bricksandclicks_house',
  'Online_Matrix_Usercentric_house',
  'Virtual_Transmitter_Interactive_house',
  'Virtual_System_Cuttingedge_house',
  'Bluetooth_Application_Robust_house',
  'Primary_Harddrive_B2C_house',
  'Haptic_Port_Transparent_house',
  'Haptic_Bus_Sexy_house',
  'Auxiliary_Feed_Cuttingedge_house',
  'Optical_Firewall_Clicksandmortar_house',
  'Auxiliary_Feed_Impactful_house',
  'Neural_Circuit_Outofthebox_house',
  'Bluetooth_Port_Compelling_house',
  'Bluetooth_Transmitter_Granular_house',
  'Optical_Bandwidth_Efficient_house',
  'Haptic_Port_Onetoone_house',
  'Online_Program_Intuitive_house',
  'Haptic_Protocol_Frontend_house',
  'Solidstate_Port_Valueadded_house',
  'Multibyte_Bandwidth_Proactive_house',
  'Opensource_Driver_Granular_house',
  'Wireless_Panel_Realtime_house',
  'Mobile_Port_Innovative_house',
  'Neural_Alarm_Bricksandclicks_house',
  'Digital_Feed_Revolutionary_house',
  'Auxiliary_System_Innovative_house',
  '1080p_Circuit_Scalable_house',
  'Auxiliary_Alarm_Onetoone_house',
  'Haptic_System_Worldclass_house',
  '1080p_Microchip_Ubiquitous_house',
  'Multibyte_System_Interactive_house',
  'Haptic_Firewall_Ebusiness_house',
  'Virtual_Feed_Proactive_house',
  '1080p_Bus_Viral_house',
  'Wireless_Matrix_Frictionless_house',
  'Bluetooth_Application_Revolutionary_house',
  '1080p_Application_Bricksandclicks_house',
  'Backend_Bus_24/365_house',
  'Mobile_Alarm_Granular_house',
  'Backend_Alarm_Bestofbreed_house',
  'Wireless_Panel_Clicksandmortar_house',
  'Crossplatform_Harddrive_Wireless_house',
  'Solidstate_Alarm_Robust_house',
  'Neural_Application_Intuitive_house',
  'Multibyte_Interface_Interactive_house',
  'Backend_System_Rich_house',
  'Backend_Feed_Usercentric_house',
  'Bluetooth_System_Realtime_house',
  'Multibyte_Alarm_24/7_house',
  'Mobile_Alarm_Dotcom_house',
  'Multibyte_Sensor_Opensource_house',
  'Auxiliary_Sensor_Endtoend_house',
  'Solidstate_Card_Cuttingedge_house',
  'Wireless_Interface_Interactive_house',
  'Auxiliary_Panel_Vertical_house',
  'Multibyte_Program_Wireless_house',
  'Crossplatform_Microchip_Synergistic_house',
  'Bluetooth_Matrix_Magnetic_house',
  'Mobile_Sensor_Missioncritical_house',
  'Virtual_Port_Bleedingedge_house',
  'Auxiliary_Bus_Bestofbreed_house',
  'Haptic_Alarm_B2B_house',
  '1080p_Array_Plugandplay_house',
  'Optical_Microchip_Revolutionary_house',
  'Digital_Card_B2C_house',
  'Bluetooth_Microchip_Webenabled_house',
  '1080p_Matrix_Impactful_house',
  'Neural_Feed_Enterprise_house',
  'Crossplatform_Matrix_Visionary_house',
  'Optical_Card_Proactive_house',
  'Redundant_Alarm_Plugandplay_house',
  'Redundant_Alarm_Seamless_house',
  'Wireless_Application_Endtoend_house',
  'Virtual_Panel_Scalable_house',
  '1080p_System_Visionary_house',
  'Solidstate_Bandwidth_Nextgeneration_house',
  'Crossplatform_System_Endtoend_house',
  'Wireless_Driver_Rich_house',
  'Backend_Matrix_Robust_house',
  'Opensource_Bandwidth_B2B_house',
  'Mobile_Pixel_Proactive_house',
  'Backend_Harddrive_Frictionless_house',
  'Auxiliary_Array_Ubiquitous_house',
  'Mobile_Pixel_Frictionless_house',
  'Online_Transmitter_Dotcom_house',
  'Bluetooth_Sensor_Revolutionary_house',
  'Crossplatform_Protocol_Granular_house',
  'Primary_Matrix_Realtime_house',
  'Crossplatform_Port_Wireless_house',
  'Online_Bus_Integrated_house'
];



var toFillListingItemsTable = function () {
  var listingId = 10001;
  var weekend;
 //set random number to set max num of Guests
  for (var i = 0; i < 100; i++) {
   //random price using Faker npm package
    var pricePerNight = faker.commerce.price(100,180.00,2); //range between 100 - 180
    //random value to get weekend variable either true or false
    var random = Math.floor(Math.random() * 10);
    var maxGuests = Math.floor(Math.random() * 3 + 2);
    //setup boolean for if weekend price is applicable
    if (random % 2 === 0) {
      weekend = 0;
    } else {
      weekend = 1;
    }


    //add randowm value to set weekend as true or false
    listingTableData += `INSERT into listingItems (listingId, listingName, pricePerNight, weekend, weekendPrice, maxGuests, tax) VALUES (${listingId}, '${listingNames[i]}', ${pricePerNight}, ${weekend}, 1.1, ${maxGuests}, 1.12);\n `
    listingId++;
  }
  //return listingTableData;

}
//invoke function to populate Listing table data
toFillListingItemsTable();




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

}
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
  var mysqlQueriesForEachListingItem =''
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
    var eachQuery = `INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (${listingId}, ${days}, '${startMonthSliced}', '${checkInDate}', '${checkOutDate}', ${guests}, 0, 0 ); \n `;
    mysqlQueriesForEachListingItem += eachQuery;
  }
//console.log('acum', acum)
  return mysqlQueriesForEachListingItem;
}

//console.log('setUpRanges', setUpSixBookingsPerListing(arrOfCalendarDays, 10000))


var toFillBookingsTable = function (arr, listingId) {

  for (var i = 0; i < 100; i++) {
    bookingTableData += setUpSixBookingsPerListing(arr, listingId);
    listingId++;
  }
  //console.log('bookingTableData', bookingTableData)



};

toFillBookingsTable(arrOfCalendarDays, 10001);

var writeSchema = function (callback) {
  fs.writeFile ('../schema.sql', schema, function (err, results) {
    if (err) {
      console.log('err', err);
    } else {
      console.log('success');
    }
  })
}
//console.log('listingTableData', listingTableData)
var schema = `
DROP DATABASE IF EXISTS reservation_service;

CREATE DATABASE reservation_service;

USE reservation_service;

CREATE TABLE listingItems (
  id int NOT NULL AUTO_INCREMENT,
  listingId int NOT NULL,
  listingName VARCHAR(100),
  pricePerNight DECIMAL(5, 2) NOT NULL,
  weekend boolean NOT NULL default 0,
  weekendPrice DECIMAL(3, 2) NOT NULL,
  maxGuests int NOT NULL,
  tax DECIMAL(3, 2) NOT NULL,
  PRIMARY KEY(id)

);

CREATE TABLE bookings (
  id int NOT NULL AUTO_INCREMENT,
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

${listingTableData}
${bookingTableData}

`
//write Schema into Schema.sql file
writeSchema();

