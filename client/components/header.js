import React from 'react'
import Link from 'next/link'

const Header = ({ currentUser }) => {
  const navOptions = [
    !currentUser && { label: 'Sign up', href: '/auth/signup' },
    !currentUser && { label: 'Sign in', href: '/auth/signin' },
    currentUser && { label: 'Sign out', href: '/auth/signout' },
  ]
    .filter(Boolean)
    .map(({ href, label }) => (
      <li className='nav-item' key={href}>
        <Link href={href}>
          <a className='nav-link'>{label}</a>
        </Link>
      </li>
    ))

  return (
    <nav className='navbar navbar-light bg-light'>
      <Link href='/'>
        <a className='navbar-brand'>Ticketify</a>
      </Link>

      <div className='d-flex justify-content-end'>
        <ul className='nav d-flex align-items-center'>{navOptions}</ul>
      </div>
    </nav>
  )
}

export default Header
