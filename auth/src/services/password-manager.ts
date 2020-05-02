import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'

const scriptAsync = promisify(scrypt)

export class PasswordManager {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex')
    const buf = (await scriptAsync(password, salt, 64)) as Buffer

    return `${buf.toString('hex')}.${salt}`
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    // separate the hashed pass from the salt
    const [hashedPassword, salt] = storedPassword.split('.')
    // hash the supplied password using the same salt
    const buf = (await scriptAsync(suppliedPassword, salt, 64)) as Buffer
    // check if they match!
    return buf.toString('hex') === hashedPassword
  }
}
