import React from 'react';

var GuestsDisplay = (props) => {


  return (
  <div className="guestDropDown">
    <table className="guestDisplay">
      <tbody>
  <tr className="guestsRow">
    <td>Adults</td>
    <td className="guestButton" ><button onClick={props.onDecrease} className="symbolsButton">-</button></td>
    <td>{props.guests}</td>
    <td className="guestButton"><button className="symbolsButton" onClick={props.onIncrease}>+</button></td>
  </tr>
  <tr className="guestsRow">
    <td>Children</td>
    <td className="guestButton"><button className="symbolsButton">-</button ></td>
    <td>{props.numOfChildren}</td>
    <td className="guestButton"><button className="symbolsButton">+</button></td>
  </tr>
  <tr className="guestsRow">
    <td>Infants</td>
    <td className="guestButton"><button className="symbolsButton">-</button></td>
    <td>{props.numOfInfants}</td>
    <td className="guestButton"><button className="symbolsButton">+</button></td>
  </tr>
  </tbody>
  </table>

    <p className="underGuests">2 guests maximum. Infants don’t count toward the number of guests.</p>
    <button className="closeButton"
  onClick={props.onClose}>Close</button>
  </div>
  )
}


export default GuestsDisplay;