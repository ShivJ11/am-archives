export const getTrendingAnime = `
  query {
    Page(perPage: 5) {
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        title {          
          english
        }
        bannerImage
        startDate {
          year
          month
          day
        }
        trending
        # Type (Movie or TV Series)
        format
        # Number of episodes
        episodes
        # Duration of each episode
        duration
        # Short description
        description        
      }
    }
  }
`;

export const animeDetailsById = `
query ($id: Int) {
  Media(id: $id, type: ANIME) {
    id
    title {
      romaji
      english
      native
    }
    description
    episodes
    season
    seasonYear
    genres
    averageScore
    coverImage {
      extraLarge
    }
    bannerImage
    isAdult
    format
    status
    duration
    startDate {
      year
      month
      day
    }
    studios {
      edges {
        node {
          id
          name
          siteUrl
        }
        isMain
      }
    }
    trailer {
      id  
      site
      thumbnail
    }
    characters {
      edges {
        node {
          name {
            full
          }
          image {
            large
          }
        }
        role
        voiceActors {
          name {
            full
          }
          image {
            large
          }
        }
      }
    }
  }
}
`