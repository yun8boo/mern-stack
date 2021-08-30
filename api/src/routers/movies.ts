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

// update
router.put('/:id', verifyToken, async(req: Request, res) => {
  if(req.user.isAdmin) {
    try {
      const updateMovie = await MovieModel.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      }, {
        new: true
      })
      res.status(200).json(updateMovie)
    } catch (err) {
      res.status(500).json(err)
    }
  }else {
    res.status(403).json('You are not allowed!')
  }
})

// delete
router.delete('/:id', verifyToken, async(req: Request, res) => {
  if(req.user.isAdmin) {
    try {
      await MovieModel.findByIdAndDelete(req.params.id)
      res.status(200).json('The movie has been deleted!')
    } catch (err) {
      res.status(500).json(err)
    }
  }else {
    res.status(403).json('You are not allowed!')
  }
})

// get all
router.get('/', verifyToken, async(req: Request, res) => {
  if(req.user.isAdmin) {
    try {
      const movies = await MovieModel.find()
      res.status(200).json(movies)
    } catch (err) {
      res.status(500).json(err)
    }
  }else {
    res.status(403).json('You are not allowed!')
  }
})

// get random
router.get('/random', verifyToken, async(req: Request, res) => {
  const type = req.query.type
  try {
    if(type === 'series') {
      const movie = await MovieModel.aggregate([
        { $match: { isSeries: true } },
        { $sample: {size: 1 } }
      ])
      res.status(200).json(movie)
    }else {
      const movie = await MovieModel.aggregate([
        { $match: { isSeries: false } },
        { $sample: {size: 1 } }
      ])
      res.status(200).json(movie)
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

// get
router.get('/:id', verifyToken, async(req: Request, res) => {
  try {
    const movie = await MovieModel.findById(req.params.id)
    res.status(200).json(movie)
  } catch (err) {
    res.status(500).json(err)
  }
})


export default router