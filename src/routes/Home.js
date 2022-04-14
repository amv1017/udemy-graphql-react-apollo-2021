import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
  const link = '/123'
  return (
    <div>
      <h1>Главная страница</h1>
      <Link to={link}>Film {link}</Link>
    </div>
  )
}
