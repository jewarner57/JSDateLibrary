const as = require('../src/index.js');

// Test Constants
const EasyDate = new as.ED('April 21, 2021, 4:03:39')
const empty = '';

// Test getters work correctly
test('Year', () => {
  expect(EasyDate.year).toBe(2021)
  expect(EasyDate.yr).toBe(21)
})

test('Month', () => {
  expect(EasyDate.month).toBe("April")
  expect(EasyDate.mon).toBe("Apr")
  expect(EasyDate.numMonth).toBe(4)
})

test('Day', () => {
  expect(EasyDate.day).toBe("Wednesday")
  expect(EasyDate.dy).toBe("Wed")
  expect(EasyDate.numDay).toBe(3)
  expect(EasyDate.dom).toBe(21)
})

test('Time', () => {
  expect(EasyDate.hours).toBe(4)
  expect(EasyDate.mins).toBe(3)
  expect(EasyDate.secs).toBe(39)
})

// Test Other Methods
test('zeroPad', () => {
  expect(EasyDate.zeroPadNumber(EasyDate.hours)).toBe("04")
  expect(EasyDate.zeroPadNumber(EasyDate.mins)).toBe("03")
  expect(EasyDate.zeroPadNumber(0)).toBe("00")
})

test('Format', () => {
  expect(EasyDate.format("%M-%D-%Y, %H:%I:%S")).toBe("04-21-2021, 04:03:39")
})

test('When', () => {
  // Check close dates where a year change happened
  expect(new as.ED("Dec 23, 2020").when(new Date("Jan 1, 2021"))).toBe("9 days, 0 minutes from now")
  // Check with times within less than 1 minute of each other
  expect(EasyDate.when(new Date("April 21, 2021, 4:03:38 AM"))).toBe("Less than a minute ago")
  expect(EasyDate.when(new Date("April 21, 2021, 4:03:40 AM"))).toBe("Less than one minute from now")
})

// test('Capitalize', () => {
//   expect(empty.capitalize()).toBe('');
//   expect('a sentence'.capitalize()).toBe('A sentence');
// });

// const EasyDate = new ED('April 21, 2021, 4:03:39')
// console.log(EasyDate.format('%M-%D-%Y %H:%I:%S'))
// console.log(EasyDate.when(new Date('June 17, 2027, 4:24 PM')))
// console.log(EasyDate.when(new Date('August 9, 2009, 3:54 PM')))
// console.log(EasyDate.when(new Date('April 13, 2021, 5:06 PM')))
// console.log(EasyDate.when(new Date('May 13, 2021, 5:06 PM')))
// console.log(EasyDate.when(new Date('April 5, 2021, 5:06 PM')))
// console.log(EasyDate.when(new Date('April 21, 2021, 4:03:38 AM')))