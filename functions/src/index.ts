import algoliasearch from 'algoliasearch'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { decode } from 'html-entities'
import { getSubredditInfo } from './reddit'
import subreddits from './subreddits'

admin.initializeApp()

export const scrapeSubreddits = functions
  .runWith({ timeoutSeconds: 240, memory: '2GB' })
  .pubsub.schedule('0 */2 * * *')
  .timeZone('America/New_York')
  .onRun(async (context) => {
    console.log('-- STARTING REDDIT SCRAPE -- ')

    for (const sub of subreddits) {
      try {
        const info = await getSubredditInfo(sub.name)

        const name = decode(info.data.display_name)
        const url = info.data.url
        const subscribers = info.data.subscribers
        const foundedAt = info.data.created * 1000

        const logo = info.data.community_icon
          ? decode(info.data.community_icon)
          : info.data.icon_img
          ? decode(info.data.icon_img)
          : null

        console.log(` -- SAVING ${sub.name} to firestore --`)

        await admin
          .firestore()
          .collection('subreddits')
          .doc(sub.name)
          .set(
            {
              name,
              url,
              subscribers,
              foundedAt,
              logo,
              updatedAt: Date.now(),
              tags: sub.tags ?? [],
            },
            { merge: true }
          )
      } catch (e) {
        console.error(e)
      }
    }

    return true
  })

export const onSubredditWrite = functions.firestore
  .document('subreddits/{subredditName}')
  .onWrite(async (change, context) => {
    const { app_id, admin_key } = functions.config().algolia

    const algoliaClient = algoliasearch(app_id, admin_key)

    const index = algoliaClient.initIndex('subreddits')

    if (!change.after.exists) {
      return index.deleteObject(context.params.subredditName)
    }

    const newData = change.after.data()

    if (!newData) {
      return
    }

    const dataToIndex = {
      objectID: context.params.subredditName,
      _tags: newData.tags,
      ...newData,
    }

    return index.saveObject(dataToIndex)
  })
