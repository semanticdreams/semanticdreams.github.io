import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
    includeSrc: true,
    excerpt: true,
    transform(rawData) {
        return rawData
            .filter((page) => !page.frontmatter?.draft)
            .map((page) => ({
                title: page.frontmatter.title,
                url: page.url,
                excerpt: truncateText(page.frontmatter.description || '', 100),
                date: formatDate(page.frontmatter.date),
                image: getImagePath(page.url)
            }))
            .sort((a, b) => b.date.time - a.date.time)
    }
})

function truncateText(text, length) {
    if (text.length > length) {
        return text.substring(0, length) + "...";
    }
    return text;
}

function formatDate(raw) {
    const date = new Date(raw)
    date.setUTCHours(12)
    return {
        time: +date,
        string: date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        })
    }
}

function getImagePath(url) {
    const filename = url.split('/').slice(-1)[0].split('.')[0]
    return filename + '.png'
}
