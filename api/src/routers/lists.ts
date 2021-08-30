import { Router, Request} from 'express'
import { ListModel } from '../models/List'
import { verifyToken } from '../utils/jwt/verifyToken'

const router = Router()

// create
router.post('/', verifyToken, async(req: Request, res) => {
  if(req.user.isAdmin) {
    const newList = new ListModel(req.body)
    try {
      const saveList = await newList.save()
      res.status(201).json(saveList)
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
      await ListModel.findByIdAndDelete(req.params.id)
      res.status(200).json('The list has been deleted')
    } catch (err) {
      res.status(500).json(err)
    }
  }else {
    res.status(403).json('You are not allowed!')
  }
})

// get
router.get('/', verifyToken, async (req, res) => {
  const typeQuery = req.query.type
  const genreQuery = req.query.genre
  let list = []
  try {
    if(typeQuery){
      if(genreQuery) {
        list = await ListModel.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } }
        ])  
      }else {
        list = await ListModel.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } }
        ])  
      }
    }else {
      list = await ListModel.aggregate([
        { $sample: { size: 10 } }
      ])
    }
    res.status(200).json(list)
  } catch (err) {
    res.status(500).json(err)
  }
})

export default router