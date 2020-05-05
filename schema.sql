DROP DATABASE IF EXISTS reservation_service;

CREATE DATABASE reservation_service;

USE reservation_service;

CREATE TABLE listingItems (
  id int NOT NULL AUTO_INCREMENT,
  listingId int NOT NULL,
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

LOAD DATA LOCAL INFILE '/Users/jasonjacob/Desktop/seniorProjects/sdc/jason-sdc-service/database/listingInfoCSV'
INTO TABLE listingItems
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/Users/jasonjacob/Desktop/seniorProjects/sdc/jason-sdc-service/database/bookingsInfoCSV'
INTO TABLE bookings
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

