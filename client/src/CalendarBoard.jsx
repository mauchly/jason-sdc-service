import React from 'react';
import WeekRow from './WeekRow.jsx';
//import createMonth from './help.js'

var CalendarBoard = (props) => {

 //const arr = createMonth(31, 6)

 return (
  <div className="calendarFrame">
    <button className="goLeft" onClick={props.onPrevious}>&larr;</button><span>{props.month} {props.year}</span>
    <button className="goRight" onClick={props.onNext}>&rarr;</button>

    <table className="calendarBoard" align="center">
         <thead>
            <tr>
              <th className="tableHead">Su</th>
              <th className="tableHead">Mo</th>
              <th className="tableHead">Tu</th>
              <th className="tableHead">We</th>
              <th className="tableHead">Th</th>
              <th className="tableHead">Fr</th>
              <th className="tableHead">Sa</th>
            </tr>
          </thead>
          <tbody>
        {props.monthGrid.map((dataArr, i) => {
          //maybe change <tb> to <tbody> as well?
          //maybe remove the <tr>s from below?
          return <WeekRow onDayClick={props.onDayClick} month={props.monthNum}key={i} week={dataArr} booked={props.booked} newBookedDateRange={props.newBookedDateRange}/>
        })}
        </tbody>
    </table>
    <span className="clearButton"
    onClick={props.onClear} style={{padding:'3px'}}>Clear Dates</span>
  </div>
 )
      }

export default CalendarBoard;