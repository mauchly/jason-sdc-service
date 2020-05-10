-- Postgres schema

--  Execute this file for Postgres from the command line by typing:
--    psql -f schema.sql -U <pgUsername> reservation_service
--  with the database reservation_service already created to generate and seed the tables.

-- CREATE TABLE listingItems (
--   id int NOT NULL,
--   listingId int NOT NULL,
--   pricePerNight DECIMAL(5, 2) NOT NULL,
--   weekend boolean NOT NULL default 'false',
--   weekendPrice DECIMAL(3, 2) NOT NULL,
--   maxGuests int NOT NULL,
--   tax DECIMAL(3, 2) NOT NULL,
--   PRIMARY KEY(id)
-- );

-- CREATE TABLE bookings (
--   id int NOT NULL,
--   listingId int,
--   nights int,
--   month VARCHAR(5),
--   checkIn VARCHAR(10),
--   checkOut VARCHAR(10),
--   guests int,
--   children int default 0,
--   infants int default 0,
--   PRIMARY KEY(id)
-- );

-- COPY listingItems
-- FROM '/Users/jasonjacob/Desktop/seniorProjects/sdc/jason-sdc-service/database/listingInfoCSV' DELIMITER ',' CSV HEADER;

-- COPY bookings
-- FROM '/Users/jasonjacob/Desktop/seniorProjects/sdc/jason-sdc-service/database/bookingsInfoCSV' DELIMITER ',' CSV HEADER;

------------------------------------------------------------------------------------------------------

-- mysql schema

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

--  Execute this file for mysql from the command line by typing:
--    mysql -u root < schema.sql
--  to create the database and generate and seed the tables.


------------------------------------------------------------------------------------------------------


-- run these commands from inside database directory in command line to seed MongoDB
-- mongoimport --type csv -d reservation_service -c listingItems --headerline --drop listingInfoCSV
-- mongoimport --type csv -d reservation_service -c bookings --headerline --drop bookingsInfoCSV