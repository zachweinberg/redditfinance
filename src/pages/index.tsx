import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Subreddit, Tag } from 'types'
import FilterSelect from '~/components/FilterSelect'
import Header from '~/components/Header'
import ListItem from '~/components/ListItem'

const Home = () => {
  const [subreddits, setSubreddits] = useState<Subreddit[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [tags, setTags] = useState<Tag[]>([])

  const fetchSubreddits = async () => {
    setLoading(true)

    let url = `/api/subreddits`

    if (tags.length > 0) {
      url += `?tags=${tags.join(',')}`
    }

    const response = await axios.get(url)

    setSubreddits(response.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchSubreddits()
  }, [tags])

  return (
    <>
      <Head>
        <title>Reddit Finance - The database of finance and investing subreddits.</title>
      </Head>

      <Header />

      <main className="max-w-4xl mx-auto">
        <div className="px-5">
          <h1 className="mt-8 text-[40px] font-semibold text-dark text-center">
            Finance Subreddits
          </h1>

          <p className="my-8 text-base font-medium text-center text-gray-500">
            The redditors guide to finance and investing subreddits.
          </p>
        </div>

        <div className="max-w-xs mx-auto mb-8">
          <FilterSelect selectedTags={tags} setTags={setTags} />
        </div>

        <ul>
          {!loading &&
            subreddits.map((subreddit) => (
              <ListItem key={subreddit.name} subreddit={subreddit} />
            ))}
        </ul>
      </main>
    </>
  )
}

export default Home
