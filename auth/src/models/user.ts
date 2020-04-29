import mongoose from 'mongoose'

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

userSchema.statics.build = (attrs: UserAttrs) => new User(attrs)

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

const user = User.build({
  email: 'didio@fsm.sc',
  password: '12345',
})

export { User }
