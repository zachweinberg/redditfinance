export interface Subreddit {
  name: string
  subscribers: number
  updatedAt: number
  redditDescription: string
  ourDescription: string
  title: string | null
  foundedAt: number
  logo: string | null
  url: string
  tags: string[]
}
