# jason-sdc-service

## Table of Contents

1. [Introduction](#Introduction)
1. [Related Projects](#Related-Projects)
1. [Usage](#Usage)
1. [Tech Stack](#Tech-Stack)
1. [CRUD](#CRUD)
1. [Engineering Journal](#Engineering-Journal)
1. [Copyright and License](#Copyright-and-License)

## Introduction

This is a mock Airbnb Reservations Microservice. It is designed using Service Oriented Architecture to be integrated with three other services that as a whole make up an entire mock Airbnb listings page. I inherited the Front End of this microservice and my main purpose was to stress test the individual microservice (and eventually our application as a whole) and then optimize the entire back end design in order to assure it can operate under high usage circumstances (over 10,000 rps).

I first created 10 million listing records (which can each be viewed in the browser at localhost:{PORT}/listing/{LISTINGID}) and inserted them into a Postgres database. Each listing record had 6 bookings records, so 60 million more records were generated and stored as well, totaling 70 million records. I then did the same in MongoDB and decided to use MongoDB for our specific use case after benchmarking both databases.

Including my service, there are a total of four services intergrated together in our proxy server. Three other Software Engineers and I worked collaboratively in order to turn our four services into a smooth, single page application, and assure its credibility in a high stress environment. While the service itself is stand-alone, it was built to be part of an entire AirBnb replica of a listing page.

## Related Applications

  - Reviews Service: https://github.com/mauchly/andy-sdc-service
  - Photo Gallery Service: https://github.com/mauchly/mervin-sdc-service
  - Recommendations Service: https://github.com/mauchly/joshua-sdc-service

## Usage

### npm install
  Install the dependencies in a local node_modules folder

### mongo
  Enter into Mongo shell

  #### use reservation_service
  Create database and enter into it

  #### db.createCollection('listingitems');
  Create listingitems collection

  #### db.createCollection('bookings');
  Create bookings collection

  #### CTL+C
  Exit Mongo shell

### npm run create-data
  Create two CSV files w/ 10M unique listing records (and 60M supporting bookings records)

### mongoimport --type csv -d reservation_service -c listingitems --headerline --drop listingInfoCSV
  Seed the listingitems collection in the reservation_service database

### mongoimport --type csv -d reservation_service -c bookings --headerline --drop bookingsInfoCSV
  Seed the bookings collection in the reservation_service database

### npm run react
  Correctly bundles the React app in production mode and optimizes the build for the best performance. Builds app into a bundle.js file in the public folder.

### npm run start
  Runs the app in the development mode.
  Open http://localhost:3002 to view it in the browser.

## Tech Stack

- Javascript
- MongoDB
- PostgresQL
- Express
- React
- Node
- Nginx
- AWS (EC2 & S3)
- Webpack
- Babel
- Jest
- Enzyme
- SuperTest
- Faker
- Brotli
- Npm

## CRUD

Create - http://{HOSTNAME}:{PORT}/listingInfo
Read - http://{HOSTNAME}:{PORT}/listingInfo
Update - http://{HOSTNAME}:{PORT}/listingInfo
Delete - http://{HOSTNAME}:{PORT}/listingInfo

## Engineering Journal

https://github.com/bettergrammer/jason-sdc-journal/blob/master/journal.md

## Copyright and License
The MIT License (MIT) [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)
