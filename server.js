var express = require('express');
var path = require('path');
var app = express();

// Parse string into [unix, day, month, year].
// 'unix' is a number, the rest are strings.
// If can't parse, return with no value.
function parseDate(str) {
    return [0, '1', 'January', '1970'];
}

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
          { "unix": parsed[0], "natural": parsed[2] + " " + parsed[1] + ", " + parsed[3] }
      ));
  }
});

app.listen(process.env.PORT, process.env.IP);