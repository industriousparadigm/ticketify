import request from 'supertest'
import { app } from '../../app'

it('returns 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'diogo@cos.ta',
      password: 'foobar',
    })
    .expect(201)
})

it('returns 400 on invalid email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'helloworld',
      password: 'foobar',
    })
    .expect(400)
})

it('returns 400 on invalid password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'diogo@cos.ta',
      password: 'foo',
    })
    .expect(400)
})

it('returns 400 on missing credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'diogo@cos.ta' })
    .expect(400)
  await request(app)
    .post('/api/users/signup')
    .send({ password: 'foobar' })
    .expect(400)
})

it('rejects signup from existing email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'diogo@cos.ta',
      password: 'foobar',
    })
    .expect(201)
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'diogo@cos.ta',
      password: 'foobar',
    })
    .expect(400)
})

it('sets cookie on successful signup', async () => {
  // this test depends on cookie-session setting secure: false (app.js)
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'diogo@cos.ta',
      password: 'foobar',
    })
    .expect(201)

  expect(response.get('Set-Cookie')).toBeDefined()
})
