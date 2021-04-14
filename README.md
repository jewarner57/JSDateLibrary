## Easy Date
### Has the default JavaScript Date object left you frustrated and sad? Then Easy Date is here to bury your sadness under another level of abstraction.

<br>

### How to get started?
* You can [download easydate on npm](https://www.npmjs.com/package/@jewarner57/easydate)

<br>

### EasyDate Docs:
* Below is a list of EasyDate's methods with examples and tips for using them.

### format()
* Create a date format string using our list of valid format codes and send it as an argument to the format method. It will return a formatted date.
``` javascript
new EasyDate("March 21, 2021").format("%M-%D-%Y") -> "03-21-2021"
```

### Valid format codes and their meaning:
| Code |       Meaning      |
|------|--------------------|
|  %Y  | Full Year (2021)
|  %y  | Short year (21) 
|  %B  | Full month name (August)    
|  %b  | Abrev. month name (Aug)  
|  %M  | Zero padding month number July: (07)
|  %m  | Month number July: (7) 
|  %W  | Full weekday name (Monday)   
|  %w  | Abrev. weekday name (Mon)
|  %a  | Weekday number Sun: (0)   
|  %D  | Zero padded day of the month (09) 
|  %d  | Day of the month (09)
|  %H  | Zero padded hour 5pm: (05)
|  %h  | Hour (5)
|  %I  | Zero padded minute 5:07pm: (07)
|  %i  | Minute 5:07pm: (7)
|  %S  | Zero padded seconds 5:07:08pm: (08)
|  %s  | Seconds 5:07:08pm: (8)