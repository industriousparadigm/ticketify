import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'
import { RequestValidationError } from '../errors/request-validation-error'
import { BadRequestError } from '../errors/bad-request-error'

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
  async (req: Request, res: Response) => {
    // stop if express validator found errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array())
    }

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
      'some-secret that should be in ENVs'
    )

    // put the token in a cookie using cookie-sessions
    req.session = {
      jwt: userJwt,
    }

    res.status(201).send(user)
  }
)

export { router as signupRouter }
