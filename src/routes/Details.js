import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import styled from 'styled-components'

const GET_MOVIE = gql`
  query getMovie($id: Int!){
    movie(id: $id) {
      id
      title
      medium_cover_image
      description_intro
      rating
      language
      isLiked @client
    }
    suggestions(id: $id) {
      id
      title
    }
  }
`

const Container = styled.div`
  padding-top: 2rem;
  width: 100%;
  min-height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  display: flex;
  justify-content: space-evenly;
  color: white;
`

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
  height: max-content;
`

const Poster = styled.img`
  height: 100%;
  min-width: 20rem;
  margin-top: 2rem;
  border: 0.5rem solid slateblue;
`

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`

const Description = styled.p`
  font-size: 28px;
  margin-bottom: 6rem;
`

const Suggestions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 16px;
  margin: 2rem 0;
  width: 90%;
`

export default () => {
  const { id } = useParams()
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: {id: parseInt(id)},
  })
  return (
    <Container>
      <Column>
        <Title>{data?.movie?.title}</Title>
        {!loading &&
          <Subtitle>
            {data?.movie?.language} · {data?.movie?.rating}
          </Subtitle>
        }
        {!loading &&
          <div>{data?.movie?.isLiked ? '👍' : '👎'}</div>
        }
        <Description>{data?.movie?.description_intro}</Description>
        {!loading && <div style={{fontSize:'24px'}}>Suggested movies...</div>}
        <Suggestions>
          {data?.suggestions.map((s) => (
            <div key={s.id}><Link to={`/${s.id}`}>{s.title}</Link></div>
          ))}
        </Suggestions>
      </Column>
      {!loading && <Poster src={data?.movie?.medium_cover_image}></Poster>}
      {!loading && <Link to='/'>Home</Link>}
    </Container>
  )
}
