const mongoose = require('mongoose')
const { Schema, model } = mongoose

const exerciseSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: Date,
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

const Exercise = model('Exercise', exerciseSchema)

module.exports = Exercise