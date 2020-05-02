import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'

declare global {
  namespace NodeJS {
    interface Global {
      getAuthCookie(): Promise<string[]>
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
global.getAuthCookie = async () => {
  const email = 'test@diogo.com'
  const password = 'password'

  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201)

  return response.get('Set-Cookie')
}
