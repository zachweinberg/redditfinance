import algoliasearch from "algoliasearch/lite";
import { Subreddit } from "~/types";

const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APP_ID!,
  process.env.ALGOLIA_SEARCH_KEY!
);

const subredditsIndex = algoliaClient.initIndex("subreddits");

export const algoliaSearchSubreddits = async (searchTerm: string) => {
  const results = await subredditsIndex.search<Subreddit>(searchTerm, {
    hitsPerPage: 5,
    filters: "",
  });
  return results.hits ?? [];
};
