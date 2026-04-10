<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { publicationDetails, publications } from '../data/publications'
import { renderMarkdown } from '../lib/markdown'

const route = useRoute()

const slug = computed(() => String(route.params.slug ?? ''))

const publication = computed(() =>
  publications.find((item) => item.links.detail === `/papers/${slug.value}`),
)

const detailContent = computed(() => publicationDetails[slug.value])

const renderedContent = computed(() =>
  detailContent.value
    ? renderMarkdown(detailContent.value.markdown, { assets: detailContent.value.assets })
    : '',
)
</script>

<template>
  <main class="detail-shell">
    <div class="detail-content">
      <RouterLink
        class="back-link"
        to="/"
      >
        Back to home
      </RouterLink>

      <section class="detail-card">
        <template v-if="publication && renderedContent">
          <p class="detail-meta">{{ publication.venue }}</p>
          <h1 class="detail-title">{{ publication.title }}</h1>
          <p class="detail-authors">{{ publication.authors.join(', ') }}</p>
          <article
            class="markdown-body"
            v-html="renderedContent"
          />
        </template>

        <template v-else>
          <h1 class="detail-title">Detail page not found</h1>
          <p class="detail-empty">当前论文没有可用的 Markdown 详情内容。</p>
        </template>
      </section>
    </div>
  </main>
</template>

<style scoped>
.detail-shell {
  min-height: 100vh;
  padding: 40px 20px 64px;
  box-sizing: border-box;
}

.detail-content {
  width: min(820px, 100%);
  margin: 0 auto;
  display: grid;
  gap: 20px;
}

.back-link {
  color: #6a7ba2;
  text-decoration: underline;
  text-decoration-color: #cbd1de;
  text-underline-offset: 0.16em;
  font-weight: 600;
}

.back-link:hover {
  text-decoration: underline;
}

.detail-card {
  padding: 32px;
  border: 1px solid #dbe3f0;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.04);
}

.detail-meta,
.detail-title,
.detail-authors,
.detail-empty {
  margin: 0;
}

.detail-meta {
  color: #6a7ba2;
  font-weight: 700;
}

.detail-title {
  margin-top: 12px;
  color: #1e3a8a;
  line-height: 1.2;
}

.detail-authors {
  margin-top: 12px;
  color: #64748b;
  line-height: 1.8;
  font-size: 0.96rem;
}

.detail-empty {
  margin-top: 12px;
  color: #64748b;
}

.markdown-body {
  margin-top: 28px;
  color: #334155;
  line-height: 1.78;
  max-width: 42rem;
}

.markdown-body :deep(h2),
.markdown-body :deep(h3) {
  margin-top: 1.8em;
  color: #1e3a8a;
}

.markdown-body :deep(p),
.markdown-body :deep(li) {
  line-height: 1.9;
}

.markdown-body :deep(a) {
  color: #6a7ba2;
  text-decoration-color: #cbd1de;
  text-underline-offset: 0.16em;
}

.markdown-body :deep(img) {
  display: block;
  max-width: 100%;
  width: auto;
  height: auto;
  margin: 1.25rem 0;
}
</style>
