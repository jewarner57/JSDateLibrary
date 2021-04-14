class ED {
  constructor(...args) {
    this.date = new Date(...args)
    this.formatingChars = {
      // Full year
      '%Y': this.year,
      // Short year
      '%y': this.yr,
      // Full month name
      '%B': this.month,
      // Abrev. month name
      '%b': this.mon,
      // Zero padded month number
      '%M': this.zeroPadNumber(this.numMonth),
      // month number
      '%m': this.numMonth,
      // Full weekday name
      '%W': this.day,
      // Short weekday name
      '%w': this.dy,
      // Weekday number: Sun:0
      '%a': this.numDay,
      // Padded Date of Month
      '%D': this.zeroPadNumber(this.dom),
      // Date of Month
      '%d': this.dom,
      // Padded hours
      '%H': this.zeroPadNumber(this.hours),
      // hours
      '%h': this.hours,
      // padded minutes
      '%I': this.zeroPadNumber(this.mins),
      // minutes
      '%i': this.mins,
      // padded seconds
      '%S': this.zeroPadNumber(this.secs),
      // seconds
      '%s': this.secs,
    }
  }

  /**
* year
* @type {String}
*/
  get year() {
    return this.date.getFullYear()
  }

  /**
* yr
* @type {number}
*/
  get yr() {
    return this.date.getFullYear() % 100
  }

  /**
* month
* @type {String}
*/
  get month() {
    return this.date.toLocaleString('en-us', { month: 'long' });
  }

  /**
* mon
* @type {String}
*/
  get mon() {
    return this.date.toLocaleString('en-us', { month: 'short' });
  }

  /**
* numMonth
* @type {number}
*/
  get numMonth() {
    return this.date.getMonth() + 1
  }

  /**
* day
* @type {String}
*/
  get day() {
    return this.date.toLocaleString('en-us', { weekday: 'long' });
  }

  /**
* dy
* @type {String}
*/
  get dy() {
    return this.date.toLocaleString('en-us', { weekday: 'short' });
  }

  /**
* numDay
* @type {number}
*/
  get numDay() {
    return this.date.getDay()
  }

  /**
* dom
* @type {number}
*/
  get dom() {
    return this.date.getDate()
  }

  /**
* hours
* @type {number}
*/
  get hours() {
    return this.date.getHours()
  }

  /**
* mins
* @type {number}
*/
  get mins() {
    return this.date.getMinutes()
  }

  /**
 * secs
 * @type {number}
 */
  get secs() {
    return this.date.getSeconds()
  }

  /**
 * zeroPadNumber
 * @param {number} input number
 * @returns {String} a zero padded number
 */
  zeroPadNumber(num) {
    return num > 9 ? String(num) : `0${num}`
  }

  /**
* format
* @param {string} input a string mask
* @returns {String} a mask where all formatting chars have been replaced
*/
  format(mask) {
    let convertedMask = mask

    // Split on each special character and then join with its substitute
    Object.keys(this.formatingChars).forEach((key) => {
      convertedMask = convertedMask.split(key).join(this.formatingChars[key])
    });

    return convertedMask
  }

  /**
* when
* @param {String, number} input a singular unit name, and the amount of that unit
* @returns {String} a singular if 1 or plural if > 1 unit name
*/
  getUnitForm(unitName, unitAmount) {
    if (unitAmount > 1) {
      return `${unitName}s`
    }
    return unitName
  }

  /**
* when
* @param {Date} input a date
* @returns {String} a human readable difference of time between the two dates
*/
  when(date) {
    const now = new Date(this.date)
    // Get the difference between the two dates in minutes
    const dateDifference = (date - now) / 60000
    // Decide whether it's in the past or future
    let suffix = dateDifference > 0 ? ' from now' : ' ago'

    const dateDiffArr = []

    // Since date difference is in minutes
    // We can check if the total time difference is < 1 minute
    if (dateDifference > 0 && dateDifference < 1) {
      dateDiffArr.unshift('Less than one minute')
    }
    if ((dateDifference < 0 && dateDifference > -1)) {
      dateDiffArr.unshift('Less than a minute')
    }
    if (dateDifference === 0) {
      dateDiffArr.unshift('Now')
      suffix = ''
    }

    const minutes = Math.abs(dateDifference) % 60
    if (Math.floor(minutes) > 0) {
      dateDiffArr.unshift(`${Math.round(Math.abs(minutes))} ${this.getUnitForm('minute', minutes)}`)
    }

    const hours = Math.floor(Math.abs((dateDifference / 60) % 24))
    if (hours > 0) {
      dateDiffArr.unshift(`${hours} ${this.getUnitForm('hour', hours)}`)
    }

    const days = Math.floor(Math.abs((dateDifference / 1440) % 30))
    if (days > 0) {
      dateDiffArr.unshift(`${days} ${this.getUnitForm('day', days)}`)
    }

    const months = Math.floor(Math.abs((dateDifference / 43200) % 12))
    if (months > 0) {
      dateDiffArr.unshift(`${months} ${this.getUnitForm('month', months)}`)
    }

    const years = Math.floor(Math.abs(dateDifference / 525600))
    if (years > 0) {
      dateDiffArr.unshift(`${years} ${this.getUnitForm('year', years)}`)
    }

    return `${dateDiffArr.join(', ')}${suffix}`
  }
}

module.exports = { ED }
