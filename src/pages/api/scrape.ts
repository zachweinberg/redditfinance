import { decode } from "html-entities";
import { setDocument } from "~/lib/firestore";
import { getSubredditInfo } from "~/lib/reddit";
import { Subreddit } from "~/types";

const subreddits = [
  "investing",
  "wallstreetbets",
  "wallstreetbetscrypto",
  "stocks",
  "options",
  "valueinvesting",
  "thetagang",
  "bitcoin",
  "dogecoin",
  "pelosi_trades",
  "ethereum",
  "ethtrader",
  "vitards",
  "pennystocks",
  "cryptocurrency",
  "securityanalysis",
  "robinhood",
  "investmentclub",
  "stock_picks",
  "stockmarket",
  "forex",
  "personalfinance",
  "frugal",
  "povertyfinance",
  "fire",
  "leanfire",
  "fatfire",
  "financialindependence",
];

const handler = async (req, res) => {
  for (const sub of subreddits) {
    const info = await getSubredditInfo(sub);

    const name = info.data.display_name;
    const url = info.data.url;
    const subscribers = info.data.subscribers;
    const foundedAt = info.data.created * 1000;

    const logo = info.data.community_icon
      ? decode(info.data.community_icon)
      : info.data.icon_img
      ? decode(info.data.icon_img)
      : null;

    await setDocument<Subreddit>("subreddits", sub, {
      subscribers,
      logo,
      name,
      url,
      foundedAt,
    });
  }

  res.status(200).json(true);
};

export default handler;
