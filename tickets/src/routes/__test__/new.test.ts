import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'

it('has a route handler listening to "/api/tickets" for post requests', async () => {
  const response = await request(app).post('/api/tickets').send({})
  expect(response.status).not.toEqual(404)
})

it('cannot be accessed by an unauthenticated user', async () => {
  await request(app).post('/api/tickets').send({}).expect(401)
})

it('returns a status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.getAuthCookie())
    .send({})
  expect(response.status).not.toEqual(401)
})

it('returns an error if an invalid title is provided', async () => {
  // wrong title
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.getAuthCookie())
    .send({ title: '', price: 10 })
    .expect(400)

  // no title
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.getAuthCookie())
    .send({ price: 10 })
    .expect(400)
})

it('returns an error if an invalid price is provided', async () => {
  // wrong price
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.getAuthCookie())
    .send({ title: 'the end', price: -10 })
    .expect(400)

  // no price
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.getAuthCookie())
    .send({ title: 'the end' })
    .expect(400)
})

it('creates a ticket with valid inputs', async () => {
  let tickets = await Ticket.find({})
  expect(tickets.length).toEqual(0)

  const newTicket = {
    title: 'beer',
    price: 5,
  }

  // add in a check to make sure the ticket was saved
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.getAuthCookie())
    .send(newTicket)
    .expect(201)

  tickets = await Ticket.find({})
  expect(tickets.length).toEqual(1)
  expect(tickets[0].title).toEqual(newTicket.title)
  expect(tickets[0].price).toEqual(newTicket.price)
})
