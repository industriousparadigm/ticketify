import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import { currentUserRouter } from './routes/current-user'
import { signupRouter } from './routes/signup'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { errorHandler, NotFoundError } from '@ticketify/common'

const app = express()
// add rule for express to know it's behind an nginx proxy
app.set('trust proxy', true)
app.use(express.json())
app.use(
  cookieSession({
    signed: false,
    // secure should be true, except in testing
    secure: process.env.NODE_ENV !== 'test',
  })
)

app.use(currentUserRouter)
app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
