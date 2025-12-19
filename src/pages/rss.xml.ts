import rss from "@astrojs/rss";
import prisma from "../lib/prisma";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const posts = await prisma.post.findMany({
    where: {published: true},
    orderBy: {createdAt: "desc"},
    select: {id: true, title: true, content: true, slug: true, signature: true, createdAt: true}
  })

  return rss({
    title: "shaffan.dev - RSS Feed",
    description: "Stay updated with the latest posts from shaffan.dev",
    site: "https://shaffan.dev",
    items: posts.map((post) => ({
      title: post.title,
      pubDate: post.createdAt,
      description: post.signature ? `This post is PGP signed. Signature:\n\n${post.signature}` : "This post is not signed.",
      link: `https://shaffan.dev/post/${post.slug}`,
      content: post.content,
    })),
  })
}