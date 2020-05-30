import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'
import jwt from 'jsonwebtoken'

declare global {
  namespace NodeJS {
    interface Global {
      getAuthCookie(): string[]
    }
  }
}

let mongo: any

beforeAll(async () => {
  process.env.JWT_KEY = 'tesTy_s3cret'

  mongo = new MongoMemoryServer()
  const mongoUri = await mongo.getUri()

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()
  collections.forEach(async (collection) => {
    await collection.deleteMany({})
  })
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})

/**
 * Add a global function so that we can easily get
 * an auth cookie during tests
 */
global.getAuthCookie = () => {
  // build a jwt payload: { id, email }
  const payload = {
    id: 'yespapa',
    email: 'test@test.com',
  }

  // create the jwt!
  const token = jwt.sign(payload, process.env.JWT_KEY!)

  // build Session object: { jwt: 43u89gh348y }
  const session = { jwt: token }

  // JSONify the session object
  const sessionJson = JSON.stringify(session)

  // take JSON and encode it as base64
  const base64str = Buffer.from(sessionJson).toString('base64')

  // return a string which is the cookie with encoded data
  return [`express:sess=${base64str}`]
}
