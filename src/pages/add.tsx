import axios from 'axios'
import { trackGoal } from 'fathom-client'
import { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Layout from '~/components/Layout'

const Add: NextPage = () => {
  const [success, setSuccess] = useState(false)
  const [name, setName] = useState('')
  const [url, setURL] = useState('')
  const [description, setDescription] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    trackGoal('LALLM9GO', 0)
    await axios.post('/api/add', { name, url, description })
    setSuccess(true)
    setName('')
    setURL('')
    setDescription('')
  }

  return (
    <Layout>
      <Head>
        <title>Reddit Finance - The database of finance and investing subreddits.</title>
      </Head>

      <div className="px-5 mb-10">
        <h1 className="mt-8 text-[40px] font-semibold text-dark">Add a subreddit</h1>
        <p className="mt-4 text-sm font-medium leading-5 text-gray-500">
          If you know of a subreddit that is related to finance or investing and is not
          listed here, please submit it below. We will add submissions to the database
          daily. If the subreddit is not related to finance or investing, the request will
          be ignored.
        </p>
      </div>

      <form className="px-5 space-y-7" onSubmit={onSubmit}>
        <div className="flex flex-col">
          <label htmlFor="name" className="font-semibold">
            Subreddit name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            autoComplete="off"
            placeholder="Wallstreetbets"
            required
            className="p-3 mt-3 border border-gray-200 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="url" className="font-semibold">
            Subreddit URL
          </label>
          <input
            value={url}
            onChange={(e) => setURL(e.target.value)}
            type="text"
            autoComplete="off"
            name="url"
            placeholder="https://reddit.com/r/wallstreetbets"
            required
            className="p-3 mt-3 border border-gray-200 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="font-semibold">
            Short description. What's the sub about?
          </label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            autoComplete="off"
            name="description"
            placeholder="Description"
            required
            className="p-3 mt-3 border border-gray-200 rounded-md"
          />
        </div>

        <div className="flex items-center">
          <button
            className="p-4 mr-3 font-bold text-white rounded-md hover:opacity-80"
            style={{ backgroundColor: '#fe4500' }}
            type="submit"
          >
            Submit
          </button>

          {success && (
            <span className="font-medium text-green-600">
              Thanks! We will add this subreddit soon!
            </span>
          )}
        </div>
      </form>
    </Layout>
  )
}

export default Add
