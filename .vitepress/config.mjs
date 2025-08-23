import { defineConfig } from 'vitepress'

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
      { text: 'Blog', link: '/' },
      { text: 'Projects', link: '/projects' },
      { text: 'About', link: '/about' },
    ],
    search: {
        provider: 'local'
    },

    sidebar: {
        '/projects/space/': [
            { text: 'space', items: [
                { text: 'Overview', link: '/projects/space/' },
            ]}
        ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/semanticdreams' }
    ],
    footer: {
        message: "Contact me via email at <a href='mailto:hello@semanticdreams.com'>hello@semanticdreams.com</a>."
    }
  },
  markdown: {
    image: {
      lazyLoading: true
    }
  }
})
