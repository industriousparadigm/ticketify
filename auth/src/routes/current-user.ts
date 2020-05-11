import express from 'express'
import { currentUser } from '@ticketify/common'

const router = express.Router()

// middleware adds currentUser object to Request
router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null })
})

export { router as currentUserRouter }
