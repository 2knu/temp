require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require("dns");
const bodyParser = require("body-parser");
const shortUrlDb = require("./short-url-db");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

function shorturlHandler(req, res) {
  const url = req.body.url;
  dns.lookup(url, (err, address, family) => {
    if (err) {
      res.json({
        error: "invalid url"
      })

    } else {
      const shortUrl = shortUrlDb.create(url);
      res.json({
        original_url: url,
        short_url: shortUrl
      })
    }
  })
}

app.use(bodyParser.urlencoded({ extended: false }))
app.post("/api/shorturl", shorturlHandler);

function shorturlRedirectHandler(req, res) {
  const id = req.params.id;
  if (shortUrlDb.isValidID(id)) {
    const url = shortUrlDb.getURL(id);
    console.log(url);
    if (url) {
      res.redirect(url);
    } else {
      res.json({ error: "No short URL found for the given input" });
    }
  } else {
    res.json({ error: "Wrong format" });
  }
}

app.get("/api/shorturl/:id", shorturlRedirectHandler);

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
