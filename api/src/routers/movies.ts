import { Router, Request} from 'express'
import { MovieModel } from '../models/Movie'
import { verifyToken } from '../utils/jwt/verifyToken'

const router = Router()

// create
router.post('/', verifyToken, async(req: Request, res) => {
  if(req.user.isAdmin) {
    const newMovie = new MovieModel(req.body)
    try {
      const saveMovie = await newMovie.save()
      res.status(201).json(saveMovie)
    } catch (err) {
      res.status(500).json(err)
    }
  }else {
    res.status(403).json('You are not allowed!')
  }
})

export default router