import mongoose from 'mongoose'
import { app } from './app'

// wrap code in a function because we can't await without async
const start = async () => {
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY not defined')

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error(err)
  }

  app.listen(3000, () => {
    console.log('Auth service: listening on port 3000...')
  })
}

start()
