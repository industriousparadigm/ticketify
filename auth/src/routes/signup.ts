import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { validateRequest, BadRequestError } from '@ticketify/common'
import { User } from '../models/user'

const router = express.Router()

router.post(
  '/api/users/signup',
  // express-validator checks the inputs
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be 4-20 characters'),
  ],
  // helper middleware to throw error if bad inputs
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    // stop if this user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new BadRequestError('Email in use')
    }

    // create user and store it in the DB
    const user = User.build({ email, password })
    await user.save()

    // log the new user in
    // create JWT with user data we are interested in
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      // exclamation is to override a TS error
      process.env.JWT_KEY!
    )

    // put the token in a cookie using cookie-sessions
    req.session = {
      jwt: userJwt,
    }

    res.status(201).send(user)
  }
)

export { router as signupRouter }
