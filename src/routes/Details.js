import React from 'react'
import { useParams } from 'react-router-dom'

export default () => {
  const { id } = useParams()
  console.log(id)
  return (
    <h1>О фильме</h1>
  )
}