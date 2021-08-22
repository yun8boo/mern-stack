import mongoose, { model } from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profilePic: {type: String, default: ''},
    isAdmin: {type: Boolean, default: false},
  },{
    timestamps: true
  }
)

export const UserModel = model('User', UserSchema)