require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const ShortURL = require('./models/short-url')
const dns = require('dns')

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
// built-in middleware function in Express. It parses incoming request with urlencoded payloads and is based on body-parser
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/views/index.html`)
})

app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' })
})

app.post('/api/shorturl', async (req, res) => {
  const url = req.body.url

  dns.lookup(new URL(url).hostname, async (err, address) => {
    if (!address) {
      res.json({ error: 'invalid url' })
    } else {
      const findURL = await ShortURL.findOne({ original_url: url })

      if (findURL) {
        res.json(findURL)
      } else {
        // use the count of documents in the collection as the value of the short url
        const countUrls = await ShortURL.countDocuments({})
        const newURL = new ShortURL(
          {
            original_url: url,
            short_url: countUrls
          }
        )
        await newURL.save()
        res.json(newURL)
      }
    }
  })
})

app.get('/api/shorturl/:short_url', async (req, res) => {
  const shortUrl = req.params.short_url
  const findUrl = await ShortURL.findOne({ short_url: shortUrl })

  if (findUrl) {
    res.redirect(findUrl.original_url)
  } else {
    res.status(400).json({ error: 'invalid url' })
  }
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
