import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { PasswordManager } from '../services/password-manager'
import { User } from '../models/user'
import { validateRequest, BadRequestError } from '@ticketify/common'

const router = express.Router()

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('invalid email'),
    body('password').trim().notEmpty().withMessage('enter a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (!existingUser) throw new BadRequestError('bad credentials')

    const passwordsMatch = await PasswordManager.compare(
      existingUser.password,
      password
    )
    if (!passwordsMatch) throw new BadRequestError('bad credentials')

    // log the new user in
    // create JWT with user data we are interested in
    const existingUserJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      // exclamation is to override a TS error
      process.env.JWT_KEY!
    )

    // put the token in a cookie using cookie-sessions
    req.session = {
      jwt: existingUserJwt,
    }

    res.status(200).send(existingUser)
  }
)

export { router as signinRouter }
