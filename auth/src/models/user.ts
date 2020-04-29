import mongoose from 'mongoose'
import { Password } from '../services/password'

/**
 * Mongoose and TypeScript are a bad match, so we need to hack
 * our way into getting proper type checking.
 */

// interface for new User props
interface UserAttrs {
  email: string
  password: string
}

// interface for User Model props
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

// interface for User Document props
interface UserDoc extends mongoose.Document {
  email: string
  password: string
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    // we can access the current user's password with get()
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
  done()
})

// add method to mongoose's Schema to build user in a typesafe fashion
userSchema.statics.build = (attrs: UserAttrs) => new User(attrs)

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }
