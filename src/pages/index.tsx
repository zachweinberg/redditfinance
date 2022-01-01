import Head from 'next/head'
import Header from '~/components/Header'

const Home = () => {
  return (
    <>
      <Head>
        <title>Reddit Finance</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <Header />

      <main className="max-w-4xl mx-auto">
        <div className="px-5">
          <h1 className="mt-8 text-[40px] font-semibold text-dark text-center">
            Finance Subreddits
          </h1>

          <p className="my-8 text-base text-center text-gray-500">
            The redditors guide to all finance and investing subreddits. Data
            updated hourly.
          </p>
        </div>

        <ul>
          {/* {subreddits.map((subreddit) => (
            <ListItem subreddit={subreddit} />
          ))} */}
        </ul>
      </main>
    </>
  )
}

export default Home
