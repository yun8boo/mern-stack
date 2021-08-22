import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRouter from './routers/auth'

dotenv.config()

mongoose.connect(process.env.MONGO_URL as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => console.log('db connect')).catch(e => console.log(e))

const app = express()

const PORT = 8800

app.use(express.json())

app.use('/api/auth', authRouter)

app.listen(PORT, () => {
  console.log('server is running');
})