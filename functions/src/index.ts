import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { decode } from 'html-entities'
import { getSubredditInfo } from './reddit'
import subreddits from './subreddits'

export const scrapeSubreddits = functions
  .runWith({ timeoutSeconds: 240, memory: '2GB' })
  .pubsub.schedule('* * * * *')
  .timeZone('America/New_York')
  .onRun(async (context) => {
    for (const sub of subreddits) {
      const info = await getSubredditInfo(sub.name)

      const name = info.data.display_name
      const url = info.data.url
      const subscribers = info.data.subscribers
      const foundedAt = info.data.created * 1000

      const logo = info.data.community_icon
        ? decode(info.data.community_icon)
        : info.data.icon_img
        ? decode(info.data.icon_img)
        : null

      await admin.firestore().collection('subreddits').doc(sub.name).set(
        {
          name,
          url,
          subscribers,
          foundedAt,
          logo,
        },
        { merge: true }
      )
    }

    return true
  })
