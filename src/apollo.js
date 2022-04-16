import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
  resolvers: {
    Movie: {
      isLiked: () => false
    },
    Mutation: {
      toggleLikeMovie: (_, {id, isLiked}, {cache}) => {
        cache.modify({
          id: `Movie:${id}`,
          fields: {
            isLiked: (isLiked) => !isLiked,
            // medium_cover_image: () => 'https://i.pinimg.com/originals/e5/cd/c6/e5cdc6cec55c6359d79440532a53041f.jpg'
          },
        })
      }
    }
  }
})

export default client
