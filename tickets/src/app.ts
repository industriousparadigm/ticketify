import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import { errorHandler, NotFoundError, currentUser } from '@ticketify/common'
import { createTicketRouter } from './routes/new'

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

app.use(currentUser)
app.use(createTicketRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
