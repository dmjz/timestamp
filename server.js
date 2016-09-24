var express = require('express');
var path = require('path');
var app = express();

// ----------------------------------------------------------------------------
// Misc. helper functions and variables.
var monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'];
var daysInMonthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var daysInMonthLeapArr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var secs_in_day = 24*60*60;
var secs_in_year = 365*secs_in_day;
var secs_in_leap_year = 366*secs_in_day;

function getMonthNumber (monthString) {
    return monthArr.indexOf(monthString);
}

function getDaysInMonth (monthCode) {
    return daysInMonthArr[monthCode];
}

function isLeapYear (year) {
    return year % 4 === 0;
}

// ----------------------------------------------------------------------------
// Conversion functions: UNIX to natural date, and conversely.
// Note: natural dates are given as arrays of strings: [day, month, year];
function unixToNatural(unix) {
    
}

function naturalToUnix(natural) {
    var day = parseInt(natural[0]);
    var month = getMonthNumber(natural[1]);
    var year = parseInt(natural[2]);
    var numLeapYears = Math.floor((year - 1970 + 1)/4);
    var unix = (year - 1970 - numLeapYears)*secs_in_year
                + numLeapYears*secs_in_leap_year;
    var i = 0;
    if (isLeapYear(year)) {
        while (i < month) {
            unix += daysInMonthLeapArr[i]*secs_in_day;
            i++;
        }
    } else {
        while (i < month) {
            unix += daysInMonthArr[i]*secs_in_day;
            i++;
        }
    }
    unix += (day - 1)*secs_in_day;
    return unix;
}

// ----------------------------------------------------------------------------
// Parse string into [unix, day, month, year].
// 'unix' is a number, the rest are strings.
// If can't parse, return with no value.
function parseDate(str) {
    return [0, '1', 'January', '1970'];
}

// ----------------------------------------------------------------------------
// HTTP request handling.
app.get('/', function (request, response) {
    // For an empty URL, display an about page.
    response.sendFile(path.join(__dirname, '/about.html'));
});

app.get('*', function (request, response) {
  // Extract url and attempt to parse it.
  var parsed = parseDate(request.url);
  
  // If couldn't parse url, parsed will be undefined.
  if (!parsed) {
      response.writeHead(200, { 'Content-Type' : 'application/json' });
      response.end(JSON.stringify(
          { "unix": null, "natural": null }
      ));
  } else {
      // Otherwise parsed = [unix, day, month, year].
      // 'unix' is a number, the rest are strings.
      response.writeHead(200, { 'Content-Type' : 'application/json' });
      response.end(JSON.stringify(
          { 
            "unix": parsed[0], 
            "natural": parsed[2] + " " + parsed[1] + ", " + parsed[3]
          }
      ));
  }
});

app.listen(process.env.PORT, process.env.IP);