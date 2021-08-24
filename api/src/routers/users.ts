import { Router, Request} from 'express'
import { UserModel } from '../models/User'
import crypto from 'crypto-js'
import { verifyToken } from '../utils/jwt/verifyToken'

const router = Router()

// update
router.put('/:id', verifyToken, async(req: Request, res) => {
  if(req.user.id === req.params.id || req.user.isAdmin) {
    if(req.body.password) {
      req.body.password = crypto.AES.encrypt(req.body.password, process.env.SECRET_KEY as string).toString()
    }
    try {
      const updateUser = await UserModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, {
        new: true
      })
      res.status(200).json(updateUser)
    } catch (err) {
      res.status(500).json(err)
    }
  }else {
    res.status(403).json('You can update only your account!')
  }
})

// delete
router.delete('/:id', verifyToken, async(req: Request, res) => {
  if(req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await UserModel.findByIdAndDelete(req.params.id)
      res.status(200).json('User has been deleted...')
    } catch (err) {
      res.status(500).json(err)
    }
  }else {
    res.status(403).json('You can delete only your account!')
  }
})

// get
router.get('/:id', verifyToken, async(req: Request, res) => {
  try {
    const user = await UserModel.findById(req.params.id)
    const { password, ...info } = user._doc
    res.status(200).json(info)
  } catch (err) {
    res.status(500).json(err)
  }
})

// get all
router.get('/', verifyToken, async(req: Request, res) => {
  if(req.user.isAdmin) {
    try {
      const users = await UserModel.find()
      const userInfos = users.map((user: any) => {
        const { password, ...info} = user._doc
        return info
      })
  
      res.status(200).json(userInfos)
    } catch (err) {
      res.status(500).json(err)
    }
  }else {
    res.status(403).json('You can delete only your account!')
  }
})
// get user stats

export default router