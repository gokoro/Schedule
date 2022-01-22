import { GraphQLClient, gql } from 'graphql-request'
import { anilistUrl } from '../../configs'
import retry from 'async-retry'

const client = new GraphQLClient(anilistUrl)

function handleRetry<T>(fn: () => Promise<T>): Promise<T> {
  return retry(fn, { retries: 1, minTimeout: 61 * 1000 })
}

export const PosterImageQuery = gql`
  query ($name: String) {
    Media(search: $name) {
      coverImage {
        extraLarge
      }
    }
  }
`

export interface IPostImage {
  data: {
    Media: {
      coverImage: {
        extraLarge: string
      }
    }
  }
}

export async function fetchPosterImage(name: string): Promise<IPostImage> {
  return await client.request<IPostImage>(PosterImageQuery, { name })
}

export async function handledFetchPosterImage(
  ...params: Parameters<typeof fetchPosterImage>
): ReturnType<typeof fetchPosterImage> {
  return handleRetry(() => fetchPosterImage(...params))
}

export const DateQuery = gql`
  query ($name: String) {
    Media(search: $name) {
      startDate {
        year
        month
        day
      }
    }
  }
`

export interface IDate {
  data: {
    Media: {
      startDate: {
        year: number
        month: number
        day: number
      }
    }
  }
}

export async function fetchDate(name: string): Promise<IPostImage> {
  return await client.request<IPostImage>(DateQuery, { name })
}

export async function handledFetchdate(
  ...params: Parameters<typeof fetchDate>
): ReturnType<typeof fetchDate> {
  return handleRetry(() => fetchDate(...params))
}
