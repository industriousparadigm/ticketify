import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error'

/**
 * This function is a logic repeatedly applied after validating
 * user credentials, throwing an error in case the credentials
 * are bad.
 */

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) throw new RequestValidationError(errors.array())

  next()
}
