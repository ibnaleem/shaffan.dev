import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'shaffan.dev',
  description:
    'a personal blog written by a software engineer | posting leetcode solutions, htb walkthroughs, and security news',
  href: 'https://shaffan.dev',
  author: 'shaffan',
  locale: 'en-US',
  featuredPostCount: 2,
  postsPerPage: 3,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/authors',
    label: 'authors',
  },
  {
    href: '/about',
    label: 'about',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/ibnaleem',
    label: 'GitHub',
  },
  {
    href: 'mailto:root@shaffan.dev',
    label: 'Email',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
