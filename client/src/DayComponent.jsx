import React from 'react';
import { zeroPadding } from './helperFunc.js'

var DayComponent = (props) => {
  var day = props.days;
  var month = zeroPadding(props.month);
  var value = `${month}-${day}`;
  if (day !== '') {
    value = `${month}-${day}`;
  } else {
    value = 'empty'
  }
  var name;
  console.log('newBookedRange', props.newBookedDateRange)
  if (props.newBookedDateRange.includes(value)){
    console.log('wentIn newbookedDates')
    name = 'bookedDates';
  }
  if (!props.booked.includes(value)) {
   name = 'availableDay'
  } else {
    name = 'unavailableDay'
  }
  if (value === 'empty') {
    name = 'empty'
  }
  return (

<td className={name} onClick={props.onDayClick} id={value}>{props.days}</td>

  )

}

export default DayComponent;