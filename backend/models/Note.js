const mongoose = require("mongoose")
const {Schema} = mongoose


const noteSchema = new Schema({

  user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
    title: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
      },
    tag: {
        type: String,
        default:"General"
      },
      date: {
        type: String,
        default:Date.now,
      },
  });

  module.exports = mongoose.model('notes' , noteSchema)