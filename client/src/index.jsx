// import React from 'react';
// import ReactDOM from 'react-dom';
// import $ from 'jquery';
// import '../dist/style.css';
import CalendarBoard from './CalendarBoard.jsx';
import GuestsDisplay from  './GuestsDisplay.jsx';
import PriceBreakup from './PriceBreakup.jsx';
import { getMonthDays, getFullYear, getMonthFirstDay, createMonth, getMonth, iterateOverDataArray, calculateNumOfNights, getDatesRange } from './helperFunc.js';


class Reservation extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      currentYear: null, //calendarComponent
      monthName: null,  //calendarComponent
      monthNumber: null,  //calendarComponent
      grid: [], //monthGrid
      toggleCheckinToDisplayCalendar: false,
      timesToggledonCheckinAndCheckOut: 0,
      displayCheckOut: false,
      checkin: null,  //input from user
      checkout: null,  //input from user
      bookedDates: [], //fetched from db
      listingName: '',
      price: '',
      tax: 1.12,
      serviceFee: 0.1,
      numOfNights: null,
      maxGuests: null,
      weekedBoolean: null,
      displayPriceBreakup: false,
      displayGuestsMenu: false,
      toggleGuestsMenuCount: 0,
      guests: 1,
      numOfChildren: 0,
      numOfInfants:0,
      reviews: ["4.00", " (40 reviews)"],
      msgUnderReserveButton: 'You won\'t be charged yet.',
      newBookedDateRange: [],
      guestsWord: 'Guest'
    };
    //bookedDates inside state are manually entered mock data for testing
    this.goToNextMonth = this.goToNextMonth.bind(this);
    this.goToPreviousMonth = this.goToPreviousMonth.bind(this);
    this.onDayClick = this.onDayClick.bind(this);
    this.onClickCheckinButton = this.onClickCheckinButton.bind(this);
    this.displayCheckOutDate = this.displayCheckOutDate.bind(this);
    this.clearDatesButton = this.clearDatesButton.bind(this);
    this.getBookedDates = this.getBookedDates.bind(this);
    this.getListingInfoFromServer = this.getListingInfoFromServer.bind(this);
    this.onHandleGuestsClick = this.onHandleGuestsClick.bind(this);
    this.onIncreaseOfAdults = this.onIncreaseOfAdults.bind(this);
    this.onDecreaseOfAdults = this.onDecreaseOfAdults.bind(this);
    this.onHandleCloseGuestsDisplay = this.onHandleCloseGuestsDisplay.bind(this);
    this.getReviews = this.getReviews.bind(this);
  };

  componentDidMount() {
    var currentYear = +(new Date().getFullYear());
    var currentMonth = +(new Date().getMonth()) + 1;
    var monthFirstDay = getMonthFirstDay(currentMonth, currentYear)
    var days = getMonthDays(currentMonth)
    var monthName = getMonth(currentMonth)
    // console.log('monthName', typeof monthName);
    // console.log('monthFirstDay', monthFirstDay);
    var grid = createMonth(days, monthFirstDay);
    this.setState({
      currentYear: currentYear,
      monthName: monthName,
      grid: grid,
      monthNumber: currentMonth
    });
    var listingId;
    var urlOne = 'http://ec2-52-53-179-46.us-west-1.compute.amazonaws.com/listingInfo';
    var windowUrlString = window.location.href;
    let searchedId = windowUrlString.split('/').pop();
    // console.log('searchedId', searchedId);
    if (searchedId < 1 || searchedId > 10000000) {
      listingId = 1
    } else {
      listingId = Number(searchedId);
    }
    var reviewUrl = 'http://ec2-3-101-33-236.us-west-1.compute.amazonaws.com/averageScore' + listingId;
    console.log('reviewUrl', reviewUrl);
    this.getListingInfoFromServer(urlOne, listingId);
    this.getBookedDates('http://ec2-52-53-179-46.us-west-1.compute.amazonaws.com/getBookedDates', listingId);
    this.getReviews(reviewUrl);
  };

  onClickCheckinButton () {
     this.setState({
       toggleCheckinToDisplayCalendar: !this.state.toggleCheckinToDisplayCalendar,
     });
  };

  //Calendar Component methods
   goToNextMonth () {
     console.log('next');
    var currentYear = this.state.currentYear;
    var currentMonth = this.state.monthNumber
    var newMonth = currentMonth +1;
    console.log('newMonth', newMonth)
    var monthFirstDay = getMonthFirstDay(newMonth, currentYear)
    var days = getMonthDays(newMonth)
    console.log('daysOfNext', days)
    console.log('monthFirstDay', monthFirstDay)
    var monthName = getMonth(newMonth)
    var grid = createMonth(days, monthFirstDay)
    this.setState({
      grid: grid,
      currentYear: currentYear,
      monthName: monthName,
      monthNumber: newMonth
    })
  };

  goToPreviousMonth () {
    console.log('Previous');
   var currentYear = this.state.currentYear;
   var currentMonth = this.state.monthNumber;
   var newMonth = currentMonth -1;
   console.log('newMonth', newMonth);
   var monthFirstDay = getMonthFirstDay(newMonth, currentYear);
   var days = getMonthDays(newMonth);
   console.log('daysOfNext', days);
   console.log('monthFirstDay', monthFirstDay);
   var monthName = getMonth(newMonth);
   var grid = createMonth(days, monthFirstDay);
   this.setState({
     grid: grid,
     currentYear: currentYear,
     monthName: monthName,
     monthNumber: newMonth
   });
 };

 onDayClick(e) {
  var checkInDate = e.target.id;
  var clickedTimes = this.state.timesToggledonCheckinAndCheckOut;
  var bookedDates = this.state.bookedDates;
  if (!bookedDates.includes(checkInDate) && checkInDate !== 'empty') {
    this.setState({
      timesToggledonCheckinAndCheckOut: clickedTimes+1
    });
    if (this.state.timesToggledonCheckinAndCheckOut < 1) {
    var newStr = checkInDate.replace('-', '/');
    //  console.log('newStr', newStr);
    newStr = '2020/' + newStr;
      this.setState({
        checkin: newStr,
        displayCheckOut: !this.state.displayCheckOut
      });
    }
  }
  if (this.state.checkin) {
    this.displayCheckOutDate(e);
  }
 };

 displayCheckOutDate (e) {
  var checkOutDate = e.target.id;
  // console.log('checkOutDate', checkOutDate);
  if (this.state.checkin) {
    var checkInDate = this.state.checkin;
    // console.log('checkInDate', checkInDate);
    var checkIn = checkInDate.slice(5);
    var checkInFormatted = checkIn.replace('/', '-');
    var numOfNights = calculateNumOfNights(checkInFormatted, checkOutDate);
    var newBookedRangeOfDates = getDatesRange(checkInFormatted, checkOutDate);
    this.setState({
      numOfNights: numOfNights,
      newBookedDateRange: newBookedRangeOfDates
    });
  }
  var newStr = checkOutDate.replace('-', '/');
  newStr = '2020/' + newStr;
  this.setState({
    checkout: newStr,
    toggleCheckinToDisplayCalendar: !this.state.toggleCheckinToDisplayCalendar,
    displayPriceBreakup: true
  });
 };

 clearDatesButton () {
   this.setState({
     checkin: null,
     checkout: null,
     timesToggledonCheckinAndCheckOut: 0,
     numOfNights: null,
     displayCheckOut: true,
     displayPriceBreakup: false
   });
 };

 getReviews(endPoint) {
   console.log('getting reviews...');
   let stillLoading = true;
   let set = setInterval(() => {
     if (stillLoading) {
       console.log('still loading reviews...');
     }
   }, 5000);
   $.ajax({
     method: 'GET',
     url: endPoint,
     success: (results) => {
       stillLoading = false;
       clearInterval(set);
      //  console.log('success results', typeof results);
       if (!Array.isArray(results)) {
         console.log('Could not get reviews, inserting hardcoded reviews...');
         this.setState({
           reviews: ["5.00", "(100 reviews)"]
         });
       } else {
         console.log('results', results);
         var removeComma = results.split(',');
         console.log('removeComma', removeComma);
         this.setState({
           reviews: removeComma
         });
       }
     },
     error: (err) => {
      stillLoading = false;
      clearInterval(set);
       console.log('Could not get reviews, inserting hardcoded reviews...', err);
       this.setState({
         reviews: ["5.00", " (100 reviews)"]
       });
     }
   });
 };

 getListingInfoFromServer (url, id) {
  var bodyObj = {
    listingId: id
  };
  // console.log('getListingInfoFromServer loading');
  $.ajax({
    method: 'GET',
    url: url,
    data: bodyObj,
    success: (data) => {
      // console.log('getListingInfo data', data);
    var parsedData = JSON.parse(data);
    // console.log('listingInfo GET success', parsedData);
    // var name = parsedData[0].listingName;
    var price = parsedData[0].pricePerNight;
    var maxGuests = parsedData[0].maxGuests;
    var weekendBoolean = parsedData[0].weekend;
    var tax = parsedData[0].tax;
    this.setState({
      price: price,
      maxGuests: maxGuests,
      tax: tax
    })
    },
    error: (err) => {
      console.log('listingInfo GET error', err);
    }
  })
 };

getBookedDates (url, id) {
  var bodyObj = {
    listingId: id
  };
  $.ajax({
    method: 'GET',
    url: url,
    data: bodyObj,
    success: (data) => {
      var parsedData = JSON.parse(data);
      // console.log('parsedData', parsedData);
      var checkIn = parsedData[0].checkIn;
      var checkOut = parsedData[0].checkOut;
      // console.log('getBookedDates', parsedData);
      var bookedDatesArray = iterateOverDataArray(parsedData);
      this.setState({
        bookedDates: bookedDatesArray
      })
    },
    error: (err) => {
      console.log('getBookedDates error', err);
    }
  });
}

 onHandleGuestsClick () {
   if (this.state.toggleGuestsMenuCount === 0) {
   this.setState({
     displayGuestsMenu: true,
     toggleGuestsMenuCount: this.state.toggleGuestsMenuCount+1
   });
  } else {
    this.setState({
      displayGuestsMenu: false,
      toggleGuestsMenuCount: this.state.toggleGuestsMenuCount-1
    });
  }
 };

 onIncreaseOfAdults (e) {
   console.log('guests', this.state.guests);
   if (this.state.guests === 0) {
    this.setState({
      guests: this.state.guests + 1,
      guestsWord: 'Guest'
    })
   } else if (this.state.guests > 0) {
    this.setState({
      guests: this.state.guests + 1,
      guestsWord: 'Guests'
    })
   }
 };

 onDecreaseOfAdults () {
  if (this.state.guests > 2) {
    this.setState({
      guests: this.state.guests - 1
    });
  } else if (this.state.guests === 2) {
    this.setState({
      guests: this.state.guests - 1,
      guestsWord: 'Guest'
    });
  }
 };

 onHandleCloseGuestsDisplay () {
   this.setState({
     displayGuestsMenu: false,
     toggleGuestsMenuCount: 0
   });
 };

  render () {
    var placeHolderOne;
    var placeHolderTwo;
    var checkOutNewClassName;
    if (this.state.checkin !== null) {
      placeHolderOne = this.state.checkin;

    } else {
      placeHolderOne = 'Check-in';
    }
    if (this.state.timesToggledonCheckinAndCheckOut > 1 && this.state.checkin !== null) {
      placeHolderTwo = this.state.checkout;

    } else {
      placeHolderTwo = 'Checkout';
      checkOutNewClassName = 'checkOutButton'

    }
    if(this.state.timesToggledonCheckinAndCheckOut !== 0) {
      checkOutNewClassName = 'checkOutButtonTwo';
    }

    return (
      <div className="mainFrame">
        <p>${this.state.price}
          <span className="perNight"> per night</span>
        </p>
        <span>
          <img id="star" src="https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/airbnb_star.png"/>{this.state.reviews[0]}<span className="numOfReview">{this.state.reviews[1]}</span>
        </span>
        <br></br>
        <div className="dateAndGuestStr">Dates</div>
        <div className="dateFrame">
          <button className="checkInButton" onClick={this.onClickCheckinButton}>{placeHolderOne}</button><div id="arrow">&rarr;</div>
          <button className={checkOutNewClassName}>{placeHolderTwo}</button>
        </div>
          <div>{this.state.toggleCheckinToDisplayCalendar &&<CalendarBoard monthNum={this.state.monthNumber} month={this.state.monthName} year={this.state.currentYear}monthGrid={this.state.grid} onNext={this.goToNextMonth} onPrevious={this.goToPreviousMonth} onDayClick={this.onDayClick} onClear={this.clearDatesButton} booked={this.state.bookedDates} newBookedDateRange={this.state.newBookedDateRange}/>}
        </div>
        <div className="dateAndGuestStr">
          <span>Guests</span>
        </div>
        <div className="guestsFrame">
          <div className="guestsDiv" onClick={this.onHandleGuestsClick}>  {this.state.guests} {this.state.guestsWord}</div>
        </div>
        <div className="guestsMenu">
          {this.state.displayGuestsMenu && <GuestsDisplay guests={this.state.guests} numOfChildren={this.state.numOfChildren} numOfInfants={this.state.numOfInfants} onIncrease= {this.onIncreaseOfAdults} onDecrease= {this.onDecreaseOfAdults} onClose={this.onHandleCloseGuestsDisplay}/>} <br></br>
        </div>
        <div className="priceBreakup">{this.state.displayPriceBreakup && <PriceBreakup numOfNights={this.state.numOfNights} serviceFee={this.state.serviceFee} price={this.state.price} tax={this.state.tax}/>}</div>
        <br></br>
        <button className="reserveButton">Reserve</button>
        <div className="underReserve">{this.state.msgUnderReserveButton}</div>
      </div>
    )
  };
}

export default Reservation;