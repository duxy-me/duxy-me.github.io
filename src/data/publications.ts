import { parseBibtex } from '../lib/bibtex'

import rawBibtex from '../content/publications.bib?raw'

const markdownModules = import.meta.glob(['../content/papers/*.md', '../content/papers/*/index.md'], {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const assetModules = import.meta.glob(['../content/papers/**/*', '!../content/papers/**/*.md'], {
  import: 'default',
  eager: true,
}) as Record<string, string>

export interface PublicationLinkSet {
  pdf?: string
  code?: string
  slides?: string
  detail?: string
}

export interface Publication {
  key: string
  type: string
  title: string
  authors: string[]
  venue: string
  year: number | null
  note?: string
  links: PublicationLinkSet
  bibtex: string
}

export interface PublicationDetail {
  markdown: string
  assets: Record<string, string>
}

function getMarkdownSlug(fieldValue?: string) {
  const normalized = fieldValue?.trim()

  if (!normalized) {
    return undefined
  }

  const pathMatch = normalized.match(/\/papers\/(.+?)(?:\/index\.md|\.md)?$/)
  return pathMatch?.[1] ?? normalized.replace(/^\/+|\/+$/g, '')
}

function hasMarkdownFile(slug?: string) {
  if (!slug) {
    return false
  }

  return (
    `../content/papers/${slug}.md` in markdownModules
    || `../content/papers/${slug}/index.md` in markdownModules
  )
}

function buildDetailPath(slug?: string) {
  return slug ? `/papers/${slug}` : undefined
}

function splitAuthors(value?: string) {
  if (!value) {
    return []
  }

  return value
    .split(/\s+and\s+/i)
    .map((author) => author.trim())
    .filter(Boolean)
}

const parsedEntries = parseBibtex(rawBibtex)

export const publications: Publication[] = parsedEntries.map((entry) => {
  const detailSlug = getMarkdownSlug(entry.fields.details)
  const hasDetail = hasMarkdownFile(detailSlug)

  return {
    key: entry.key,
    type: entry.type,
    title: entry.fields.title ?? entry.key,
    authors: splitAuthors(entry.fields.author),
    venue: entry.fields.venue ?? entry.fields.booktitle ?? entry.fields.journal ?? '',
    year: entry.fields.year ? Number(entry.fields.year) : null,
    note: entry.fields.note,
    links: {
      pdf: entry.fields.pdf,
      code: entry.fields.code,
      slides: entry.fields.slides,
      detail: hasDetail ? buildDetailPath(detailSlug) : undefined,
    },
    bibtex: entry.raw,
  }
})

export const publicationDetails = Object.entries(markdownModules).reduce<Record<string, PublicationDetail>>(
  (result, [path, content]) => {
    const match = path.match(/papers\/(.+?)(?:\/index)?\.md$/)
    const slug = match?.[1]
    if (slug) {
      result[slug] = {
        markdown: content,
        assets: {},
      }
    }
    return result
  },
  {},
)

Object.entries(assetModules).forEach(([path, assetUrl]) => {
  const match = path.match(/papers\/([^/]+)\/(.+)$/)
  const slug = match?.[1]
  const relativePath = match?.[2]

  if (!slug || !relativePath || !publicationDetails[slug]) {
    return
  }

  publicationDetails[slug].assets[relativePath] = assetUrl
})
