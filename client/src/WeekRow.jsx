import React from 'react';
import DayComponent from './DayComponent.jsx';

var WeekRow = (props) => (
<tr>
{props.week.map((day, i) => {
    return <DayComponent key={i} onDayClick={props.onDayClick} month={props.month} days={day} booked={props.booked} newBookedDateRange={props.newBookedDateRange}/>
   })}
</tr>
)

export default WeekRow;




