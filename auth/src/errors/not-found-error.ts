import { CustomError } from './custom-error'

export class NotFoundError extends CustomError {
  statusCode = 404

  constructor() {
    super('could not find route')

    // necessary when extending built-in classes
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors() {
    return [
      {
        message: 'could not find route',
      },
    ]
  }
}
