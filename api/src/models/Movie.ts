import mongoose, { model } from 'mongoose'

const MovieSchema = new mongoose.Schema(
  {
    title: {type: String, required: true, unique: true},
    description: {type: String},
    image: {type: String},
    imageTitle: {type: String},
    imageSm: {type: String},
    trailer: {type: String},
    video: {type: String},
    year: {type: String},
    limit: {type: Number},
    genre: {type: String},
    isSeries: {type: Boolean, default: false},
  },{
    timestamps: true
  }
)

export const MovieModel = model('Movie', MovieSchema)