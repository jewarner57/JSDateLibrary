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

  when(date) {
    const now = new Date()
    // Get the difference between the two dates in minutes
    const dateDifference = (date - now) / 60000
    // Decide whether it's in the past or future
    let suffix = dateDifference > 0 ? 'from now' : 'ago'

    // Get the number of hours, days, months, and years
    const years = Math.abs(Math.round(dateDifference / 525600))
    const months = Math.abs(Math.round((dateDifference / 43200) % 12))
    const days = Math.abs(Math.round((dateDifference / 1440) % 30))
    const hours = Math.abs(Math.round((dateDifference / 60) % 24))
    const minutes = dateDifference % 60

    let dateDiffString = `${Math.round(Math.abs(minutes))} minutes`

    if (minutes > 0 && minutes < 1) {
      dateDiffString = 'Less than one minute'
    }
    if ((minutes < 0 && minutes > -1)) {
      dateDiffString = 'Less than a minute'
    }
    if (minutes === 0) {
      dateDiffString = 'Now'
      suffix = ''
    }

    if (hours > 0) {
      dateDiffString = `${hours} hours, ${dateDiffString}`
    }

    if (days > 0) {
      dateDiffString = `${days} days, ${dateDiffString}`
    }

    if (months > 0) {
      dateDiffString = `${months} months, ${dateDiffString}`
    }

    if (years > 0) {
      dateDiffString = `${years} years, ${dateDiffString}`
    }

    return `${dateDiffString} ${suffix}`
  }
}

const EasyDate = new ED('September 21, 1821, 4:3:39')
console.log(EasyDate.format('%Y-%M-%a %H:%I:%S'))
console.log(EasyDate.when(new Date('June 17, 2027, 4:24 PM')))
console.log(EasyDate.when(new Date('August 9, 2009, 3:54 PM')))
console.log(EasyDate.when(new Date('April 13, 2021, 5:06 PM')))
console.log(EasyDate.when(new Date()))
