import request from 'supertest'
import { app } from '../../app'

it('returns details on current user', async () => {
  // auth cookie uses 'test@diogo.com'
  const authCookie = await global.getAuthCookie()

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', authCookie)
    .send()
    .expect(200)

  expect(response.body.currentUser.email).toEqual('test@diogo.com')
})

it('returns null if user is not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200)

  expect(response.body.currentUser).toEqual(null)
})
