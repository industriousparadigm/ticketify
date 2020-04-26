import express from 'express'

const router = express.Router()

router.post('/api/users/signout', (req, res) => {
  res.send('hi from signoutrouter')
})

export { router as signoutRouter }
