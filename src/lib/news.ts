const apiKey = import.meta.env.NEWSAPI_API_KEY;

export type NewsSource = {
  id: string | null;
  name: string;
};

export type NewsArticle = {
  source: NewsSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string; // ISO 8601
  content: string | null;

  slug?: string;
};

export type NewsApiResponse = {
  status: "ok" | "error";
  totalResults: number;
  articles: NewsArticle[];
};

export function extractSlugFromUrl(url: string): string {
  try {
    const { pathname } = new URL(url);

    const segments = pathname.split("/").filter(Boolean);

    return segments[segments.length - 1] ?? "";
  } catch {
    return "";
  }
}

export async function fetchSecurityNews(): Promise<NewsApiResponse> {
  const today = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 7);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  const query =
    'hacking OR hacker OR cyberattack OR "data breach" OR malware OR ransomware OR phishing ' +
    'AND NOT (podcast OR israel OR meme OR memes OR sponsor OR sponsorship OR advertisement OR ad ' +
    'OR promo OR promotion OR deal OR affiliate OR episode OR show OR series OR "life hack" ' +
    'OR lifehack OR "travel hack" OR "productivity hack" OR "growth hack" OR "marketing hack" ' +
    'OR giveaway OR sale OR discount OR coupon OR pricing)';

  const params = new URLSearchParams({
    q: query,
    sortBy: "publishedAt",
    from: formatDate(oneWeekAgo),
    to: formatDate(today),
    language: "en",
    apiKey,
  });

  const response = await fetch(
    `https://newsapi.org/v2/everything?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(`NewsAPI error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as Omit<
    NewsApiResponse,
    "articles"
  > & {
    articles: Omit<NewsArticle, "slug">[];
  };

  return {
    ...data,
    articles: data.articles.map(article => ({
      ...article,
      slug: extractSlugFromUrl(article.url),
    })),
  };
}