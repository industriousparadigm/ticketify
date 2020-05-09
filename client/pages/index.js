import React from 'react'
import buildClient from '../api/build-client'

const LandingPage = ({ currentUser }) => (
  <h1>{currentUser ? 'You are signed in' : 'Unauthenticated user :('}</h1>
)

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context)
  const { data } = await client.get('api/users/currentuser')
  return data
}

export default LandingPage
