import axios from 'axios'
import * as functions from 'firebase-functions'
import * as qs from 'qs'

const clientID = functions.config().reddit.client_id
const clientSecret = functions.config().reddit.client_secret
const username = functions.config().reddit.username

const userAgent = `web:${clientID}:v1.0.0 (by /u/${username})`

let __token: string | null = null

const getRedditAccessToken = async () => {
  const tokenResponse = await axios({
    method: 'POST',
    url: 'https://www.reddit.com/api/v1/access_token',
    auth: {
      username: clientID,
      password: clientSecret,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': userAgent,
    },
    data: qs.stringify({
      grant_type: 'client_credentials',
      device_id: 'DO_NOT_TRACK_THIS_DEVICE',
    }),
  })

  // Memory cache token
  __token = tokenResponse.data.access_token

  return tokenResponse.data.access_token
}

export const getSubredditInfo = async (subredditName: string) => {
  const token = __token ? __token : await getRedditAccessToken()

  const response = await axios({
    method: 'GET',
    url: `https://oauth.reddit.com/r/${subredditName}/about`,
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': userAgent,
    },
  })

  return response.data
}
