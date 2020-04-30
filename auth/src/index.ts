import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'

const app = express()
// add rule for express to know it's behind an nginx proxy
app.set('trust proxy', true)
app.use(express.json())
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
)

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)

app.use(errorHandler)

const start = async () => {
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
