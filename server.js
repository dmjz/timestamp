var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('the booty');
});

app.listen(process.env.PORT, process.env.IP);