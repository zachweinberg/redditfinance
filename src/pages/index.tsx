import { trackGoal } from 'fathom-client'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Subreddit, Tag } from 'types'
import FilterSelect from '~/components/FilterSelect'
import Layout from '~/components/Layout'
import ListItem from '~/components/ListItem'
import firestore from '~/lib/firestore'

interface Props {
  subreddits: Subreddit[]
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  let docRef = firestore.collection('subreddits')

  const subreddits: Subreddit[] = []

  const docs = await docRef.orderBy('subscribers', 'desc').get()

  docs.forEach((doc) => subreddits.push(doc.data() as Subreddit))

  return {
    props: { subreddits },
  }
}

const Home: NextPage<Props> = ({ subreddits }) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [displayedSubs, setDisplayedSubs] = useState<Subreddit[]>(subreddits)

  useEffect(() => {
    trackGoal('NFHJJ8EV', 0)

    if (selectedTags.length === 0) {
      setDisplayedSubs(subreddits)
      return
    }

    const foundSubs = subreddits
      .filter((sub) => sub.tags.some((tag) => selectedTags.some((t) => tag === t)))
      .sort((a, b) => b.subscribers - a.subscribers)

    setDisplayedSubs(foundSubs)
  }, [selectedTags])

  return (
    <Layout>
      <Head>
        <title>Reddit Finance - The database of finance and investing subreddits.</title>
      </Head>

      <div className="px-5">
        <h1 className="mt-8 text-[40px] font-semibold text-dark text-center">
          Finance Subreddits
        </h1>

        <p className="my-4 text-base font-medium text-center text-gray-500">
          The database of finance and investing subreddits.
        </p>
      </div>

      <div className="max-w-xs mx-auto mb-8">
        <FilterSelect selectedTags={selectedTags} setTags={setSelectedTags} />
      </div>

      <ul>
        {displayedSubs.map((subreddit) => (
          <ListItem key={subreddit.name} subreddit={subreddit} />
        ))}
      </ul>
    </Layout>
  )
}

export default Home
