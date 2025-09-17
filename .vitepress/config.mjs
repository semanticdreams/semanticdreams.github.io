import { defineConfig } from 'vitepress'
import footnote from 'markdown-it-footnote'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "semanticdreams",
  description: "semanticdreams",
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
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
      { icon: 'github', link: 'https://github.com/semanticdreams' }
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
  }
})
