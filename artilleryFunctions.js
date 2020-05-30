let listingId = 9500000;
let pricePerNight = 100;


const artilleryContext = (userContext, events, done) => {
  if (listingId > 9500200) {
    listingId = 9500000;
  }
  if (pricePerNight > 350) {
    pricePerNight = 100;
  }

  userContext.vars.listingId = listingId++;
  userContext.vars.pricePerNight = pricePerNight++;
  userContext.vars.weekend = listingId % 2 === 0 ? true : false;
  userContext.vars.weekendPrice = 1.1;
  userContext.vars.maxGuests = listingId > 9500150 ? 2 : listingId > 9500225 ? 4 : 3;
  userContext.vars.tax = 1.12;

  return done();
};

module.exports =  {
  artilleryContext
};

