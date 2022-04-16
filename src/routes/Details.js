import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

const GET_MOVIE = gql`
  query getMovie($id: Int!){
    movie(id: $id) {
      id
      title
      medium_cover_image
      description_intro
    }
  }
`

export default () => {
  const { id } = useParams()
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: {id: parseInt(id)},
  })
  return (
    <div>
      {loading && <div>Загрузка...</div>}
      <p style={{display: 'flex', justifyContent: 'space-between'}}>
        <h1>О фильме</h1>
        <Link to='/'>Home</Link>
      </p>
      <h3>{data?.movie.id}</h3>
      <h3>{data?.movie.title}</h3>
      <img src={data?.movie.medium_cover_image} />
    </div>
  )
}
