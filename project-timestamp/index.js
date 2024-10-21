// index.js
// where your node app starts

// init project
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', (req, res) => {
  const date = req.params.date

  if (!date) {
    return res.json(
      {
        unix: Date.now(),
        utc: new Date().toUTCString()
      }
    )
  }

  const dateString = new Date(date)

  if (Number(date)) {
    res.json(
      {
        unix: Number(date),
        utc: new Date(Number(date)).toUTCString()
      }
    )
  } else if (!isNaN(dateString)) {
    res.json(
      {
        unix: Date.parse(dateString),
        utc: dateString.toUTCString()
      }
    )
  } else {
    res.json(
      { error: "Invalid Date" }
    )
  }
})

// Listen on port set in environment letiable or default to 3000
let listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
