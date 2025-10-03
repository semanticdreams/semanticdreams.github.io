import { defineConfig, createContentLoader } from 'vitepress'
import footnote from 'markdown-it-footnote'
import path from 'path'
import { writeFileSync } from 'fs'
import { Feed } from 'feed'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "semanticdreams",
  description: "semanticdreams",
  head: [
      ['link', { rel: 'icon', href: '/logo.png' }],
      ['link', {
          rel: 'alternate',
          type: 'application/rss+xml',
          title: 'semanticdreams RSS Feed',
          href: '/rss.xml'
      }],
      ['link', {
          rel: 'alternate',
          type: 'application/atom+xml',
          title: 'semanticdreams Atom Feed',
          href: '/atom.xml'
      }]
  ],
  lastUpdated: true,
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    nav: [
      { text: 'Posts', link: '/' },
      { text: 'Projects', link: '/projects/' },
      { text: 'About', link: '/about' },
    ],
    search: {
        provider: 'local'
    },

    sidebar: {
        '/projects/space/': [
            { text: 'space', items: [
                { text: 'Overview', link: '/projects/space/' },
                { text: 'Concepts', link: '/projects/space/concepts' },
                { text: 'Devlog', link: '/projects/space/devlog' },
            ]}
        ]
    },

    socialLinks: [
      { icon: 'rss', link: '/atom.xml' },
      { icon: 'github', link: 'https://github.com/semanticdreams' },
    ],
    footer: {
        message: "Contact me via email at <a href='mailto:hello@semanticdreams.com'>hello@semanticdreams.com</a>. Join the community on <a href='https://matrix.to/#/#semanticdreams42:matrix.org' target='_blank'>Matrix</a>."
    }
  },
  markdown: {
    math: true,
    image: {
      lazyLoading: true
    },
    config: (md) => {
      md.use(footnote)
    }
  },
  buildEnd: async (config) => {
      const hostname = 'https://semanticdreams.com'
      const feed = new Feed({
          title: 'semanticdreams',
          description: '',
          id: hostname,
          link: hostname,
          language: 'en',
          image: `${hostname}/logo.png`,
          favicon: `${hostname}/logo.png`,
          copyright: '',
          feedLinks: {
              atom: `${hostname}/atom.xml`
          },
          author: [
              {
                  name: 'semanticdreams',
                  email: 'hello@semanticdreams.com',
                  link: 'https://semanticdreams.com'
              }
          ],
      })

      const posts = await createContentLoader('posts/*.md', {
          excerpt: true,
          render: true
      }).load()

      posts.sort(
          (a, b) =>
          +new Date(b.frontmatter.date) -
          +new Date(a.frontmatter.date)
      )

      for (const { url, excerpt, frontmatter, html } of posts) {
          feed.addItem({
              title: frontmatter.title,
              id: `${hostname}${url}`,
              link: `${hostname}${url}`,
              description: excerpt,
              content: html,
              author: [
                  {
                      name: 'semanticdreams',
                      email: 'hello@semanticdreams.com',
                      link: 'https://semanticdreams.com'
                  }
              ],
              date: frontmatter.date
          })
      }

      //writeFileSync(path.join(config.outDir, 'rss.xml'), feed.rss2())
      writeFileSync(path.join(config.outDir, 'atom.xml'), feed.atom1())
  }
})
