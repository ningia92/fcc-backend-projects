require('dotenv').config()
const express = require('express')
// The express-async-errors library allows us to eliminate the try-catch blocks from the route handlers.
// Because of the library, we do not need the next(exception) call. If an exception occurs in an async route,
// the execution is automatically passed to the error-handling middleware.
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user')
const Exercise = require('./models/exercise')

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI

mongoose.set('strictQuery', false)
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((err) => {
    console.error('error connecting to MongoDB:', err.message)
  })

app.use(cors())
app.use(express.static('public'))
// The urlencoded function is used to parse the incoming requests with URL-encoded payloads.
// It is a built-in middleware function in Express based on a body parser module.
// When there is a HTTP POST request from the client with content type application/x-www-form-urlencoded,
// this middleware parses the data and populates the req.body object with key-value pairs.
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`)
})

// add a user
app.post('/api/users', async (req, res) => {
  const body = req.body

  const user = new User({
    username: body.username
  })

  await user.save()
  res.json({
    _id: user._id,
    username: user.username
  })
})

// get all users
app.get('/api/users', async (req, res) => {
  const users = await User.find({})
  res.send(users)
})

// add a user exercise
app.post('/api/users/:id/exercises', async (req, res) => {
  const id = req.params.id
  const { description, duration, date } = req.body
  const user = await User.findById(id)

  if (!user) {
    return res.status(404).send({ error: 'user not found' })
  }

  const exercise = new Exercise({
    username: user.username,
    description: description,
    duration: duration,
    date: date ? new Date(date) : new Date(),
    user_id: user._id,
  })

  await exercise.save()
  res.json({
    username: user.username,
    description: exercise.description,
    duration: exercise.duration,
    date: new Date(exercise.date).toDateString(),
    _id: user._id
  })
})

// get count and log of the exercises added from a user
app.get('/api/users/:id/logs', async (req, res) => {
  const id = req.params.id
  const { from, to, limit } = req.query
  const user = await User.findById(id)

  if (!user) {
    return res.status(404).send({ error: 'user not found' })
  }

  let dateFilter = {}
  if (from) {
    dateFilter["$gte"] = new Date(from)
  }
  if (to) {
    dateFilter["$lte"] = new Date(to)
  }

  let filter = { user_id: id }
  if (from || to) {
    filter.date = dateFilter
  }

  let log = await Exercise.find(filter).limit(+limit || 500)
  res.json({
    username: user.username,
    count: log.length,
    _id: user._id,
    log: log.map(exercise => ({
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString()
    }))
  })
})

// unknown endpoint middleware
app.use((req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
})

// error handler middleware
app.use((err, req, res, next) => {
  console.error(err.message)
  next(err)
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})