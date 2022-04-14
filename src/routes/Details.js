import React from 'react'
import { useParams } from 'react-router-dom'

export default () => {
  const { id } = useParams()
  return (
    <div>
      <h1>О фильме</h1>
      <h3>{id}</h3>
    </div>
  )
}
