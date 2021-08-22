import { NextFunction, Response, Request } from 'express'
import jwt from 'jsonwebtoken'

export const verifyToken = (req: Request<{user: any}>, res: Response, next: NextFunction) => {
  const authHeader = req.headers.token
  if(authHeader && typeof authHeader === 'string') {
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY as string, (err, user) => {
      if(err) {
        res.status(403).json('Token is not valid')
      }
      req.user = user
      next()
    })
  }else {
    return res.status(403).json('You are not authenticated!')
  }
}