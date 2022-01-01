type Tag =
  | 'Investing'
  | 'Trading'
  | 'Real estate'
  | 'Gambling'
  | 'Low risk'
  | 'High risk'
  | 'Saving money'
  | 'Crypto'
  | 'Stocks'
  | 'Options'
  | 'Retirement'
  | 'Memes'
  | 'Entertainment'
  | 'Advanced'
  | 'Accounting'
  | 'MOASS'
  | 'Beginner'
  | 'Economy'
  | 'High net worth'
  | 'Personal finance'

type Subreddits = Array<{
  name: string
  tags?: Tag[]
}>

const subreddits: Subreddits = [
  {
    name: 'investing',
    tags: ['Investing', 'Stocks'],
  },
  {
    name: 'wallstreetbets',
    tags: ['Stocks', 'Memes', 'Options', 'Gambling', 'High risk', 'Trading'],
  },
  {
    name: 'wallstreetbetscrypto',
    tags: ['Crypto', 'Memes', 'Entertainment', 'High risk', 'Gambling'],
  },
  {
    name: 'stocks',
    tags: ['Stocks', 'Investing'],
  },
  {
    name: 'options',
    tags: ['Options', 'Trading'],
  },
  {
    name: 'valueinvesting',
    tags: ['Stocks', 'Accounting', 'Advanced', 'Investing', 'Low risk'],
  },
  {
    name: 'bogleheads',
    tags: ['Stocks', 'Low risk', 'Investing', 'Retirement'],
  },
  {
    name: 'thetagang',
    tags: ['Options', 'Advanced'],
  },
  {
    name: 'superstonk',
    tags: ['MOASS', 'Stocks'],
  },
  { name: 'gme', tags: ['MOASS', 'Stocks'] },
  { name: 'bitcoin', tags: ['Crypto'] },
  {
    name: 'dogecoin',
    tags: ['Crypto', 'Entertainment', 'Memes'],
  },
  {
    name: 'pelosi_trades',
    tags: ['Stocks', 'Options', 'Entertainment', 'Trading'],
  },
  { name: 'ethereum', tags: ['Crypto'] },
  { name: 'ethtrader', tags: ['Crypto', 'Trading'] },
  { name: 'vitards' },
  { name: 'pennystocks', tags: ['Stocks', 'High risk'] },
  { name: 'cryptocurrency', tags: ['Crypto'] },
  {
    name: 'securityanalysis',
    tags: ['Stocks', 'Advanced', 'Low risk'],
  },
  { name: 'robinhood', tags: ['Stocks', 'Crypto'] },
  { name: 'investmentclub', tags: ['Stocks', 'Investing', 'Trading'] },
  { name: 'stock_picks', tags: ['Stocks'] },
  { name: 'stockmarket', tags: ['Stocks', 'Investing', 'Trading'] },
  { name: 'forex', tags: ['Trading'] },
  { name: 'personalfinance', tags: ['Personal finance'] },
  { name: 'frugal', tags: ['Personal finance', 'Saving money'] },
  { name: 'povertyfinance', tags: ['Personal finance', 'Saving money'] },
  { name: 'fire', tags: ['Retirement'] },
  { name: 'leanfire', tags: ['Retirement'] },
  { name: 'fatfire', tags: ['High net worth', 'Retirement'] },
  { name: 'financialindependence', tags: ['Personal finance'] },
  { name: 'economics', tags: ['Economy'] },
  { name: 'realestateinvesting', tags: ['Real estate', 'Investing'] },
]

export default subreddits
