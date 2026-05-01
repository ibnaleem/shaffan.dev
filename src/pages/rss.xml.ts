import { SITE } from '@/consts'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getAllPosts } from '@/lib/data-utils'

export async function GET(context: APIContext) {
  try {
    const posts = await getAllPosts()

    const items = await Promise.all(
      posts.map(async (post) => {
        const { Content } = await post.render()

        return {
          title: post.data.title,
          description: post.data.description,
          pubDate: post.data.date,
          link: `/blog/${post.id}/`,
          content: Content(),
        }
      })
    )

    return rss({
      title: SITE.title,
      description: SITE.description,
      site: context.site ?? SITE.href,
      items,
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new Response('Error generating RSS feed', { status: 500 })
  }
}