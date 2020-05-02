import request from 'supertest'
import { app } from '../../app'

it("returns 400 if email isn't registered", async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'diogo@cos.ta',
      password: 'foobar',
    })
    .expect(400)
})

it('returns 400 if bad password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'diogo@cos.ta',
      password: 'foobar',
    })
    .expect(201)

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'diogo@cos.ta',
      password: 'foobarbaz',
    })
    .expect(400)
})

it('responds with a cookie if credentials are good', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'diogo@cos.ta',
      password: 'foobar',
    })
    .expect(201)

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'diogo@cos.ta',
      password: 'foobar',
    })
    .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
})
