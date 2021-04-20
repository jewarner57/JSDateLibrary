const as = require('../src/index.js');

// Test Constants
const EasyDate = new as.ED('April 21, 2021, 4:03:39')

// Test getters work correctly
test('Year', () => {
  expect(EasyDate.year).toBe(2021)
  expect(EasyDate.yr).toBe(21)
})

test('Month', () => {
  expect(EasyDate.month).toBe('April')
  expect(EasyDate.mon).toBe('Apr')
  expect(EasyDate.numMonth).toBe(4)
})

test('Day', () => {
  expect(EasyDate.day).toBe('Wednesday')
  expect(EasyDate.dy).toBe('Wed')
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
  expect(EasyDate.zeroPadNumber(EasyDate.hours)).toBe('04')
  expect(EasyDate.zeroPadNumber(EasyDate.mins)).toBe('03')
  expect(EasyDate.zeroPadNumber(0)).toBe('00')
})

test('Format', () => {
  // Generic Cases
  expect(EasyDate.format('%M-%D-%Y, %H:%I:%S')).toBe('04-21-2021, 04:03:39')
  expect(EasyDate.format('%W, %B %d, %h:%I')).toBe('Wednesday, April 21, 4:03')
  // Empty Edge Case
  expect(EasyDate.format('')).toBe('')
  expect(EasyDate.format('\n\t\r')).toBe('\n\t\r')
  // Cases with empty fields
  expect(new as.ED('May 2024').format('%W, %B %d, %h:%I')).toBe('Wednesday, May 1, 0:00')
  expect(new as.ED('2000').format('%W, %B %d, %Y, %h:%I')).toBe('Friday, December 31, 1999, 19:00')
})

test('When Edges', () => {
  // Check close dates where a year change happened between them
  expect(new as.ED('Dec 23, 2020').when(new Date('Jan 1, 2021'))).toBe('9 days from now')

  // Check with times within less than 1 minute of each other
  expect(EasyDate.when(new Date('April 21, 2021, 4:03:38 AM'))).toBe('Less than a minute ago')
  expect(EasyDate.when(new Date('April 21, 2021, 4:03:40 AM'))).toBe('Less than one minute from now')

  // Check for times that are the same
  expect(EasyDate.when(new Date('April 21, 2021, 4:03:39'))).toBe('Now')

  // Check singular units
  expect(EasyDate.when(new Date('May 17, 2022, 5:04:39'))).toBe('1 year, 1 month, 1 day, 1 hour, 1 minute from now')

  // Check plural units
  expect(EasyDate.when(new Date('June 29, 2024, 7:19:39'))).toBe('3 years, 2 months, 25 days, 3 hours, 16 minutes from now')
})

test('When Years', () => {
  // Check with times that have difference in years only
  expect(EasyDate.when(new Date('April 21, 2022, 4:03:39'))).toBe('1 year, 5 days from now')
  expect(EasyDate.when(new Date('April 21, 2020, 4:03:39'))).toBe('1 year, 5 days ago')
})

test('When Months', () => {
  // Check times with a difference of months only
  expect(EasyDate.when(new Date('June 21, 2021, 4:03:39'))).toBe('2 months, 1 day from now')
  expect(EasyDate.when(new Date('January 21, 2021, 4:03:39'))).toBe('2 months, 29 days, 23 hours ago')
})

test('When Days', () => {
  // Check times with a difference of days only
  expect(EasyDate.when(new Date('April 28, 2021, 4:03:39'))).toBe('7 days from now')
  expect(EasyDate.when(new Date('April 5, 2021, 4:03:39'))).toBe('16 days ago')

  // Check times that are on unit boundaries.
  expect(EasyDate.when(new Date('May 20, 2021, 4:03:39'))).toBe('29 days from now')
  expect(EasyDate.when(new Date('March 23, 2021, 4:03:39'))).toBe('29 days ago')
})

test('When Hours', () => {
  // Check times with a difference of hours only
  expect(EasyDate.when(new Date('April 21, 2021, 7:03:39'))).toBe('3 hours from now')
  expect(EasyDate.when(new Date('April 21, 2021, 1:03:39'))).toBe('3 hours ago')

  // Check times that are on unit boundaries.
  expect(EasyDate.when(new Date('April 22, 2021, 4:02:39'))).toBe('23 hours, 59 minutes from now')
  expect(EasyDate.when(new Date('April 20, 2021, 4:04:39'))).toBe('23 hours, 59 minutes ago')
})

test('When Minutes', () => {
  // Check for times that are close together
  expect(EasyDate.when(new Date('April 21, 2021, 4:10:39'))).toBe('7 minutes from now')
  expect(EasyDate.when(new Date('April 21, 2021, 3:59:39'))).toBe('4 minutes ago')

  // Check times that are on unit boundaries.
  expect(EasyDate.when(new Date('April 21, 2021, 5:02:39'))).toBe('59 minutes from now')
  expect(EasyDate.when(new Date('April 21, 2021, 3:04:39'))).toBe('59 minutes ago')
})
