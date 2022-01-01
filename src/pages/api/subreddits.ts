import { NextApiRequest, NextApiResponse } from 'next'
import { Subreddit } from 'types'
import firestore from '~/lib/firestore'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(404).end()
  }

  const { tags } = req.query as { tags: string }

  let docRef: FirebaseFirestore.CollectionReference | FirebaseFirestore.Query =
    firestore.collection('subreddits')

  if (tags) {
    const tagsAsArray = tags.split(',')
    docRef = docRef.where('tags', 'array-contains-any', tagsAsArray)
  }

  const subreddits: Subreddit[] = []

  const docs = await docRef.orderBy('subscribers', 'desc').get()

  docs.forEach((doc) => subreddits.push(doc.data() as Subreddit))

  res.status(200).json(subreddits)
}

export default handler
