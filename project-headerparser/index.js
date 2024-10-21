require('dotenv').config()
let express = require('express')
let app = express()

let cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 }))

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`)
})

app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' })
})

app.get('/api/whoami', (req, res) => {
  res.json(
    {
      ipaddress: req.ip,
      language: req.headers['accept-language'],
      software: req.headers['user-agent']
    }
  )
})

let listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on ${listener.address().port}`)
})