const request = require('supertest')
const app = require('../../server/index.js');
import 'babel-polyfill';

describe("Test the root path for listingId 10001", () => {
  test("It should response the GET method to /listingInfo", async () => {
    const serverResponse = '[{"id":1,"listingId":10001,"listingName":"Super_Cute_Retro_Airstream","pricePerNight":129,"weekend":1,"weekendPrice":1.1,"maxGuests":4,"tax":1.12}]';
    const response = await request(app)
      .get("/listingInfo")
      .query({listingId: '10001'})
      expect(response.statusCode).toBe(200)
      expect(response.text).toBe(serverResponse)
  })

    test("It should response the POST method to /getBookedDates", async () => {

      const serverResponse = '[{"id":1,"listingId":10001,"nights":2,"month":"04","checkIn":"04-13","checkOut":"04-15","guests":2,"children":0,"infants":0},{"id":2,"listingId":10001,"nights":2,"month":"04","checkIn":"04-24","checkOut":"04-26","guests":1,"children":0,"infants":0},{"id":3,"listingId":10001,"nights":3,"month":"05","checkIn":"05-7","checkOut":"05-10","guests":2,"children":0,"infants":0},{"id":4,"listingId":10001,"nights":5,"month":"05","checkIn":"05-18","checkOut":"05-23","guests":2,"children":0,"infants":0},{"id":5,"listingId":10001,"nights":4,"month":"06","checkIn":"06-2","checkOut":"06-6","guests":2,"children":0,"infants":0},{"id":6,"listingId":10001,"nights":3,"month":"06","checkIn":"06-17","checkOut":"06-20","guests":2,"children":0,"infants":0}]';

    const response = await request(app)
      .post("/getBookedDates")
      .send({listingId: '10001'})
      expect(response.statusCode).toBe(202)
      expect(response.text).toBe(serverResponse)
    })
})


describe("Test the root path for listingId 10005", () => {
  test("It should response the GET method to /listingInfo", async () => {

    const serverResponse = '[{"id":5,"listingId":10005,"listingName":"Haptic_Bandwidth_Leadingedge_house","pricePerNight":178,"weekend":0,"weekendPrice":1.1,"maxGuests":3,"tax":1.12}]';
    const response = await request(app)
      .get("/listingInfo")
      .query({listingId: '10005'})
      expect(response.statusCode).toBe(200)
      expect(response.text).toBe(serverResponse)
  })

  test("It should response the POST method to /getBookedDates", async () => {

    const serverResponse = '[{"id":25,"listingId":10005,"nights":3,"month":"04","checkIn":"04-12","checkOut":"04-15","guests":2,"children":0,"infants":0},{"id":26,"listingId":10005,"nights":4,"month":"04","checkIn":"04-21","checkOut":"04-25","guests":1,"children":0,"infants":0},{"id":27,"listingId":10005,"nights":3,"month":"04","checkIn":"04-30","checkOut":"05-3","guests":2,"children":0,"infants":0},{"id":28,"listingId":10005,"nights":2,"month":"05","checkIn":"05-15","checkOut":"05-17","guests":2,"children":0,"infants":0},{"id":29,"listingId":10005,"nights":3,"month":"05","checkIn":"05-22","checkOut":"05-25","guests":2,"children":0,"infants":0},{"id":30,"listingId":10005,"nights":2,"month":"06","checkIn":"06-6","checkOut":"06-8","guests":1,"children":0,"infants":0}]';

  const response = await request(app)
    .post("/getBookedDates")
    .send({listingId: '10005'})
    expect(response.statusCode).toBe(202)
    expect(response.text).toBe(serverResponse)
  })

})
