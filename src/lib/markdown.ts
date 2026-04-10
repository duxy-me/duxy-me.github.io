import DOMPurify from 'dompurify'
import MarkdownIt from 'markdown-it'

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

interface RenderMarkdownOptions {
  assets?: Record<string, string>
}

function isRelativeUrl(value: string) {
  return !/^(?:[a-z]+:|#|\/)/i.test(value)
}

function normalizeRelativePath(value: string) {
  const parts = value
    .split('/')
    .filter((part) => part.length > 0 && part !== '.')

  const normalized: string[] = []

  parts.forEach((part) => {
    if (part === '..') {
      normalized.pop()
      return
    }
    normalized.push(part)
  })

  return normalized.join('/')
}

function rewriteRelativeUrls(html: string, assets: Record<string, string>) {
  const parser = new DOMParser()
  const document = parser.parseFromString(html, 'text/html')

  document.querySelectorAll<HTMLImageElement>('img').forEach((image) => {
    const source = image.getAttribute('src')
    if (!source || !isRelativeUrl(source)) {
      return
    }

    const resolved = assets[normalizeRelativePath(source)]
    if (resolved) {
      image.setAttribute('src', resolved)
    }
  })

  document.querySelectorAll<HTMLAnchorElement>('a').forEach((anchor) => {
    const href = anchor.getAttribute('href')
    if (!href || !isRelativeUrl(href)) {
      return
    }

    const resolved = assets[normalizeRelativePath(href)]
    if (resolved) {
      anchor.setAttribute('href', resolved)
    }
  })

  return document.body.innerHTML
}

export function renderMarkdown(source: string, options: RenderMarkdownOptions = {}) {
  const renderedHtml = markdown.render(source)
  const htmlWithAssets = options.assets ? rewriteRelativeUrls(renderedHtml, options.assets) : renderedHtml
  return DOMPurify.sanitize(htmlWithAssets)
}
