export interface Subreddit {
  name: string;
  subscribers: number;
  averageRiskLevel: number;
  createdAt: number;
  updatedAt: number;
  redditDescription: string;
  ourDescription: string;
  title: string | null;
  foundedAt: number;
  logo: string | null;
  url: string;
}
