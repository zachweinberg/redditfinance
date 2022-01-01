import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />

          <meta
            name="title"
            content="Reddit Finance - The database of finance and investing subreddits."
          />

          <meta
            name="description"
            content="The database of finance and investing subreddits."
          />

          <meta name="robots" content="index, follow" />

          <meta
            property="og:title"
            content="Reddit Finance - The database of finance and investing subreddits."
          />

          <meta property="og:type" content="website" />

          <meta property="og:url" content="https://redditfinance.com" />

          <meta
            name="twitter:title"
            content="Reddit Finance - The database of finance and investing subreddits."
          />

          <meta property="twitter:url" content="https://redditfinance.com" />

          <meta name="theme-color" content="#fff" />

          <link rel="canonical" href="https://redditfinance.com/" />
        </Head>
        <body className="antialiased font-poppins">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
