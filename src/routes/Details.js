import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import styled from 'styled-components'

const GET_MOVIE = gql`
  query getMovie($id: Int!){
    movie(id: $id) {
      title
      medium_cover_image
      description_intro
      rating
      language
    }
    suggestions(id: $id) {
      id
      title
    }
  }
`

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-size: cover;
  background-position: center center;
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
  margin-top: 1rem;
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
        <Subtitle>
          {data?.movie?.language} · {data?.movie?.rating}
        </Subtitle>
        <Description>{data?.movie?.description_intro}</Description>
        {!loading && <div style={{fontSize:'24px'}}>Suggested movies...</div>}
        <Suggestions>
          {data?.suggestions.map((s) => (
            <div key={s.id}><Link to={`/${s.id}`}>{s.title}</Link></div>
          ))}
        </Suggestions>
      </Column>
      <Poster bg={data?.movie?.medium_cover_image}></Poster>
    </Container>
  )
}
