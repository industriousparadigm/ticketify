import { CustomError } from './custom-error'

export class DatabaseConnectionError extends CustomError {
  statusCode = 500
  reason = 'could not connect to database'

  constructor() {
    super('could not connect to database')

    // necessary when extending built-in classes
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeErrors() {
    return [{ message: this.reason }]
  }
}
