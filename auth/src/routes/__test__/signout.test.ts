import request from 'supertest'
import { app } from '../../app'

it('clears the user cookie on signout', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'diogo@cos.ta',
      password: 'foobar',
    })
    .expect(201)

  const response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
})
