// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function timeHandler(req, res) {
  const timeVal = req.params.time ? req.params.time : new Date().getTime()+"";
  const checkPattern = timeVal.match(/^\d{4}-\d{2}-\d{2}$/gi);
  const unix_timestamp = parseInt(timeVal);
  let date;
  if (!checkPattern && !isNaN(unix_timestamp)) {
    date = new Date(unix_timestamp);
  } else if (checkPattern) {
    date = new Date(checkPattern)
  }
  if (date) {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  } else {
    res.json({
      error: "Invalid Date"
    })
  }
}

app.get("/api/:time", timeHandler);
app.get("/api/", timeHandler);

app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
