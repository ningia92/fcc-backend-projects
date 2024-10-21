const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const dbUrl = process.env.MONGO_URI

console.log(`connecting to ${dbUrl}`)
mongoose.connect(dbUrl)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log(`error connecting to MongoDB: ${error}`)
  })

const urlSchema = new mongoose.Schema({
  original_url: String,
  short_url: String
})

urlSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.short_url = Number(returnedObject.short_url)
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('ShortURL', urlSchema)
