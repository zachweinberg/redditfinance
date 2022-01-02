import axios from 'axios'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { decode } from 'html-entities'
import { Subreddit, subredditList } from '../../types'
import { getSubredditInfo } from './reddit'

admin.initializeApp()

export const scrapeSubreddits = functions
  .runWith({ timeoutSeconds: 240, memory: '2GB' })
  .pubsub.schedule('0 */3 * * *')
  .timeZone('America/New_York')
  .onRun(async (ctx) => {
    await startScrape()
    await deployWebsite()
  })

export const httpTriggerScrape = functions.https.onRequest(async (req, res) => {
  await startScrape()
  await deployWebsite()
})

const deployWebsite = async () => {
  const deployHookURL = functions.config().vercel.deploy_hook
  await axios.post(deployHookURL)
}

const startScrape = async () => {
  console.log('-- STARTING REDDIT SCRAPE -- ')

  for (const sub of subredditList) {
    try {
      const info = await getSubredditInfo(sub.name)

      const name = decode(info.data.display_name)
      const url = info.data.url
      const subscribers = info.data.subscribers
      const foundedAt = info.data.created * 1000

      const title = info.data.title ? decode(info.data.title) : null
      const description =
        info.data.public_description ?? decode(info.data.description) ?? null

      const logo = info.data.community_icon
        ? decode(info.data.community_icon)
        : info.data.icon_img
        ? decode(info.data.icon_img)
        : null

      console.log(` -- SAVING ${sub.name} to firestore --`)

      const data: Partial<Subreddit> = {
        name,
        url,
        subscribers,
        foundedAt,
        title,
        redditDescription: description,
        logo,
        updatedAt: Date.now(),
        tags: sub.tags ?? [],
      }

      await admin
        .firestore()
        .collection('subreddits')
        .doc(sub.name)
        .set(data, { merge: true })
    } catch (e) {
      console.error(e)
    }
  }

  return true
}
