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

  get year() {
    return this.date.getFullYear()
  }

  get yr() {
    return this.date.getFullYear() % 100
  }

  get month() {
    return this.date.toLocaleString('en-us', { month: 'long' });
  }

  get mon() {
    return this.date.toLocaleString('en-us', { month: 'short' });
  }

  get numMonth() {
    return this.date.getMonth()
  }

  get day() {
    return this.date.toLocaleString('en-us', { weekday: 'long' });
  }

  get dy() {
    return this.date.toLocaleString('en-us', { weekday: 'short' });
  }

  get numDay() {
    return this.date.getDay()
  }

  // Returns int
  get dom() {
    return this.date.getDate()
  }

  // Returns int
  get hours() {
    return this.date.getHours()
  }

  // Returns int
  get mins() {
    return this.date.getMinutes()
  }

  // Returns int
  get secs() {
    return this.date.getSeconds()
  }

  zeroPadNumber(num) {
    return num > 9 ? String(num) : `0${num}`
  }

  format(mask) {
    let convertedMask = mask

    // Split on each special character and then join with its substitute
    Object.keys(this.formatingChars).forEach((key) => {
      convertedMask = convertedMask.split(key).join(this.formatingChars[key])
    });

    return convertedMask
  }
}

const EasyDate = new ED('September 21, 1821, 4:3:39')
console.log(EasyDate.format('%Y-%M-%a %H:%I:%S'))
