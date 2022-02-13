# redditfinance.com

- **Framework**: [Next.js](https://nextjs.org/)
- **DB**: [Firestore](https://firebase.google.com/docs/firestore)
- **Styling**: [Tailwind](https://tailwindcss.com/)
- **Deployment**: [Vercel](https://vercel.com)

## About

This is a small website built with Next.js that displays a list of subreddits related to investing and/or finance.
A central database of all subreddits might be useful to some people.

## Overview

As of today, the list of subreddits has to manually be maintained in `types.ts`. Users can submit a suggestion to add a subreddit.

- `src/*` - The Next.js website
- `functions/*` - This folder is excluded from the Next.js build and contains the Firebase function that scrapes Reddit every 3 hours.
  We just update the subscriber count for each sub in this cronjob and then re-deploy the Vercel website.
  The reason we re-deploy the website is because we are not using SSR and instead build a static website at buildtime (SSG). In the future, [ISR](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) will be implemented!

## Running the website locally

First you'll need a Firebase project and you'll need to populate an `.env.local` based off of `.env.example`

```bash
$ git clone git@github.com:zachweinberg/redditfinance
$ cd redditfinance
$ npm install
$ cd functions/ && npm install && cd ..
$ npm run dev
```

## Deploying Firebase Functions

```bash
firebase deploy --only functions
```
