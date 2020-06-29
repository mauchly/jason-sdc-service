# jason-sdc-service
Airbnb Reservations Component Mockup

## Table of Contents

1. [Introduction](#Introduction)
1. [Related Projects](#Related-Projects)
1. [Usage](#Usage)
1. [Tech](#Tech)

## Introduction

> This project is a mock Reservations Service. Its purpose was to be integrated via a reverse proxy server with three other services that as a whole make up an entire mock Airbnb listings page. The main purpose of this project was to stress test our individual services and our app as a whole in order to assure it could operate with large amounts of stored data (70M records) under high usage circumstances (1000-10000 rps).

I first created 10 million listing records (which can all be viewed in the browser at localhost:{PORT}/listing/{LISTINGID}) and inserted them into a Postgres database. Each listing record had 6 bookings records, so 60 million more records were generated and stored as well, totaling 70 million records. We were to stress test our service independently and our combined services running as one in our proxy server and make improvements in order to reach at least 10000 requests per second.

Including my service, there were a total of four services that were intergrated together in our proxy server. Three other individuals and I worked collaboratively in order to bring our four services together, seamlessly, on a single page app, and assure its credibility in a high stress environment. While the service itself is stand-alone, it was built to be part of an entire AirBnb replica listing page. This replica page was built with 3 other individuals and they each handled a particular of the site design. We worked as a team to build and develop these services and were able to bring them together on a single page.

## Related Projects

  - Reviews Service: https://github.com/mauchly/andy-sdc-service
  - Photo Gallery Service: https://github.com/mauchly/mervin-sdc-service
  - Recommendations Service: https://github.com/mauchly/joshua-sdc-service

## Usage

####npm install
  - Install dependencies in a local node_modules directory

####npm run seed
  - Create CSV files and import data for 10M unique listings

####npm run seed-db
 - Seed the PostgresQL with data from CSV files

####npm run react-dev
  - Builds out app in production mode, will make new bundle.js on each iteration

####npm run start
  - Runs development server in nodemon to see changes made

####npm run test
  - Runs Jest tests

## Tech

- NPM
- Node
- Express
- React
- PostgresQL
- Webpack
- Jest
- SuperTest
- Babel
- AWS (EC2 & S3)
- Faker
- Brotli

## CRUD

Create - http://{HOSTNAME}:{PORT}/listingInfo
Read - http://{HOSTNAME}:{PORT}/listingInfo
Update - http://{HOSTNAME}:{PORT}/listingInfo
Delete - http://{HOSTNAME}:{PORT}/listingInfo
