import React, { useState } from 'react'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(email, password)
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Signup</h1>
      <div className='form-group'>
        <label>Email address</label>
        <input
          className='form-control'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='form-group'>
        <label>Password</label>
        <input
          className='form-control'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className='btn btn-primary'>Sign up</button>
    </form>
  )
}

export default Signup
