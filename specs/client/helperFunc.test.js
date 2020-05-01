const { getMonthDays, getFullYear, getMonthFirstDay, createMonth, getMonth } = require('../../client/src/helperFunc.js');

test('get number of days for March 2020', () => {
  expect(getMonthDays(3, 2020)).toBe(31);
});

test('get month\'s first day of the week', () => {
  //for March is 0  --> 0 is Sun and 6 is Sat
  expect(getMonthFirstDay(3, 2020)).toBe(0);
});

test('get month\'s first day of the week', () => {
  //for May, 2020 is 5 <--Friday //  0 is Sun and 6 is Sat
  expect(getMonthFirstDay(5, 2020)).toBe(5);
});

test('create board grid for May', () => {
  var daysMay = getMonthDays(5, 2020);
  console.log('daysMay', daysMay)
  var monthMay = 5;
  const expected = [ [ '', '', '', '', '', 1, 2 ],
  [ 3, 4, 5, 6, 7, 8, 9 ],
  [ 10, 11, 12, 13, 14, 15, 16 ],
  [ 17, 18, 19, 20, 21, 22, 23 ],
  [ 24, 25, 26, 27, 28, 29, 30 ],
  [ 31, '', '', '', '', '', '' ] ];

  expect(createMonth(daysMay, monthMay)).toEqual(expect.arrayContaining(expected));
});

test('get month name', () => {
  expect(getMonth(12)).toEqual('December');
  expect(getMonth(4)).toEqual('April');
  expect(getMonth(6)).toEqual('June');
  expect(getMonth(9)).toEqual('September');
});
