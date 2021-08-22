import mongoose, { model } from 'mongoose'

const ListSchema = new mongoose.Schema(
  {
    title: {type: String, required: true, unique: true},
    description: {type: String},
    genre: {type: String},
    content: {type: Array}
  },{
    timestamps: true
  }
)

export const ListModel = model('List', ListSchema)