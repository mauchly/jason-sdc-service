
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

INSERT into listingItems (listingId, listingName, pricePerNight, weekend, weekendPrice, maxGuests, tax) VALUES (1, 'Super_Cute_Retro_Airstream', 153.00, 0, 1.1, 3, 1.12);
 INSERT into listingItems (listingId, listingName, pricePerNight, weekend, weekendPrice, maxGuests, tax) VALUES (2, 'Redundant_Driver_Strategic_house', 180.00, 1, 1.1, 3, 1.12);
 INSERT into listingItems (listingId, listingName, pricePerNight, weekend, weekendPrice, maxGuests, tax) VALUES (3, 'Multibyte_Program_Opensource_house', 115.00, 0, 1.1, 2, 1.12);
 INSERT into listingItems (listingId, listingName, pricePerNight, weekend, weekendPrice, maxGuests, tax) VALUES (4, 'Neural_Transmitter_Magnetic_house', 147.00, 0, 1.1, 4, 1.12);
 INSERT into listingItems (listingId, listingName, pricePerNight, weekend, weekendPrice, maxGuests, tax) VALUES (5, 'Haptic_Bandwidth_Leadingedge_house', 104.00, 0, 1.1, 4, 1.12);
 INSERT into listingItems (listingId, listingName, pricePerNight, weekend, weekendPrice, maxGuests, tax) VALUES (6, 'Primary_Harddrive_Killer_house', 121.00, 0, 1.1, 2, 1.12);
 INSERT into listingItems (listingId, listingName, pricePerNight, weekend, weekendPrice, maxGuests, tax) VALUES (7, 'Solidstate_Harddrive_Crossplatform_house', 147.00, 1, 1.1, 4, 1.12);
 INSERT into listingItems (listingId, listingName, pricePerNight, weekend, weekendPrice, maxGuests, tax) VALUES (8, 'Optical_Bandwidth_Robust_house', 159.00, 1, 1.1, 4, 1.12);
 INSERT into listingItems (listingId, listingName, pricePerNight, weekend, weekendPrice, maxGuests, tax) VALUES (9, 'Solidstate_Interface_Crossmedia_house', 174.00, 1, 1.1, 2, 1.12);
 INSERT into listingItems (listingId, listingName, pricePerNight, weekend, weekendPrice, maxGuests, tax) VALUES (10, 'Bluetooth_Port_Opensource_house', 164.00, 1, 1.1, 3, 1.12);
 
INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (1, 3, '04', '04-6', '04-9', 2, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (1, 2, '04', '04-16', '04-18', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (1, 4, '04', '04-23', '04-27', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (1, 5, '05', '05-3', '05-8', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (1, 4, '05', '05-17', '05-21', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (1, 5, '05', '05-27', '06-1', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (2, 3, '04', '04-6', '04-9', 2, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (2, 5, '04', '04-19', '04-24', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (2, 2, '04', '04-30', '05-2', 2, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (2, 5, '05', '05-14', '05-19', 2, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (2, 2, '05', '05-31', '06-2', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (2, 3, '06', '06-10', '06-13', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (3, 3, '04', '04-13', '04-16', 2, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (3, 4, '04', '04-24', '04-28', 2, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (3, 3, '05', '05-7', '05-10', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (3, 2, '05', '05-21', '05-23', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (3, 5, '06', '06-1', '06-6', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (3, 2, '06', '06-14', '06-16', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (4, 4, '04', '04-13', '04-17', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (4, 4, '04', '04-29', '05-3', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (4, 4, '05', '05-9', '05-13', 2, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (4, 3, '05', '05-21', '05-24', 2, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (4, 5, '06', '06-1', '06-6', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (4, 5, '06', '06-18', '06-23', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (5, 3, '04', '04-11', '04-14', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (5, 4, '04', '04-20', '04-24', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (5, 2, '04', '04-29', '05-1', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (5, 4, '05', '05-11', '05-15', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (5, 5, '05', '05-27', '06-1', 2, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (5, 5, '06', '06-11', '06-16', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (6, 3, '04', '04-6', '04-9', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (6, 5, '04', '04-14', '04-19', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (6, 2, '04', '04-23', '04-25', 2, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (6, 2, '05', '05-1', '05-3', 2, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (6, 3, '05', '05-15', '05-18', 2, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (6, 4, '05', '05-25', '05-29', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (7, 2, '04', '04-11', '04-13', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (7, 2, '04', '04-23', '04-25', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (7, 2, '05', '05-2', '05-4', 2, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (7, 4, '05', '05-15', '05-19', 2, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (7, 5, '05', '05-24', '05-29', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (7, 4, '06', '06-6', '06-10', 2, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (8, 4, '04', '04-5', '04-9', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (8, 2, '04', '04-21', '04-23', 2, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (8, 4, '05', '05-1', '05-5', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (8, 5, '05', '05-17', '05-22', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (8, 5, '06', '06-2', '06-7', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (8, 2, '06', '06-17', '06-19', 2, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (9, 4, '04', '04-12', '04-16', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (9, 3, '04', '04-26', '04-29', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (9, 4, '05', '05-9', '05-13', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (9, 4, '05', '05-22', '05-26', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (9, 2, '06', '06-7', '06-9', 2, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (9, 4, '06', '06-14', '06-18', 2, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (10, 3, '04', '04-11', '04-14', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (10, 5, '04', '04-24', '04-29', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (10, 4, '05', '05-8', '05-12', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (10, 5, '05', '05-19', '05-24', 1, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (10, 4, '06', '06-2', '06-6', 2, 0, 0 ); 
 INSERT into bookings (listingId, nights, month, checkIn, checkOut, guests, children, infants) VALUES (10, 3, '06', '06-18', '06-21', 2, 0, 0 ); 
 

