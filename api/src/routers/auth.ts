import { Router } from 'express'
import { UserModel } from '../models/User'
import crypto from 'crypto-js'

const router = Router()

router.post('/register', async(req, res) => {
  const newUser = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: crypto.AES.encrypt(req.body.password, process.env.SECRET_KEY as string).toString() ,
  })

  try {
    const user = await newUser.save()
    res.status(201).json(user)
  }catch(err) {
    res.status(500).json(err)
  }
})

//login
router.post('/login', async(req, res) => {
  try {
    const user = await UserModel.findOne({email: req.body.email})
    if(!user) {
      res.status(401).json('Wrong username')
    }
    const bytes = crypto.AES.decrypt(user.password, process.env.SECRET_KEY as string)
    const originalText = bytes.toString()
    if(originalText !== req.body.password) {
      res.status(401).json('Wrong password')
    }
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

export default router