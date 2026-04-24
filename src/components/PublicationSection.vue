<script setup lang="ts">
import { computed, reactive } from 'vue'
import { RouterLink } from 'vue-router'

import type { Publication } from '../data/publications'

interface PublicationSectionCopy {
  title: string
  description: string
  selectAll: string
  downloadBibtex: string
  detail: string
}

const props = defineProps<{
  publications: Publication[]
  copy: PublicationSectionCopy
}>()

const selectedMap = reactive<Record<string, boolean>>({})

const selectedPublications = computed(() =>
  props.publications.filter((publication) => selectedMap[publication.key]),
)

const allSelected = computed(
  () => props.publications.length > 0 && props.publications.every((publication) => selectedMap[publication.key]),
)

function isSelfAuthor(author: string) {
  const a = author.trim()
  return /xiao[- ]?yu du/i.test(a) || a === '杜晓宇'
}

function toggleAll(checked: boolean) {
  props.publications.forEach((publication) => {
    selectedMap[publication.key] = checked
  })
}

function downloadSelectedBibtex() {
  if (selectedPublications.value.length === 0) {
    return
  }

  const fileContent = `${selectedPublications.value.map((item) => item.bibtex).join('\n\n')}\n`
  const blob = new Blob([fileContent], { type: 'application/x-bibtex' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = 'selected-publications.bib'
  anchor.click()

  URL.revokeObjectURL(url)
}
</script>

<template>
  <section class="publication-section">
    <div class="section-heading">
      <div class="section-copy">
        <h2 class="section-title">{{ copy.title }}</h2>
        <p class="section-description">{{ copy.description }}</p>
      </div>

      <div class="section-actions">
        <label class="select-all">
          <input
            :checked="allSelected"
            type="checkbox"
            @change="toggleAll(($event.target as HTMLInputElement).checked)"
          />
          <span>{{ copy.selectAll }}</span>
        </label>

        <button
          class="download-button"
          :disabled="selectedPublications.length === 0"
          type="button"
          @click="downloadSelectedBibtex"
        >
          {{ copy.downloadBibtex }} ({{ selectedPublications.length }})
        </button>
      </div>
    </div>

    <ul class="publication-list">
      <li
        v-for="publication in publications"
        :key="publication.key"
        class="publication-card"
      >
        <div class="publication-top">
          <label class="publication-select">
            <input
              v-model="selectedMap[publication.key]"
              type="checkbox"
            />
          </label>

          <div class="publication-body">
            <h3 class="publication-title">{{ publication.title }}</h3>

            <p class="publication-authors">
              <template
                v-for="(author, index) in publication.authors"
                :key="`${publication.key}-${author}-${index}`"
              >
                <strong v-if="isSelfAuthor(author)">{{ author }}</strong>
                <span v-else>{{ author }}</span>
                <span v-if="index < publication.authors.length - 1">, </span>
              </template>
            </p>

            <p class="publication-meta">
              <span>{{ publication.venueDisplay }}</span>
              <span v-if="publication.note"> · {{ publication.note }}</span>
            </p>

            <div class="publication-links">
              <a
                v-if="publication.links.pdf"
                class="link-chip"
                :href="publication.links.pdf"
                target="_blank"
                rel="noreferrer"
              >
                PDF
              </a>
              <a
                v-if="publication.links.code"
                class="link-chip"
                :href="publication.links.code"
                target="_blank"
                rel="noreferrer"
              >
                Code
              </a>
              <a
                v-if="publication.links.slides"
                class="link-chip"
                :href="publication.links.slides"
                target="_blank"
                rel="noreferrer"
              >
                Slides
              </a>
              <RouterLink
                v-if="publication.links.detail"
                class="link-chip"
                :to="publication.links.detail"
              >
                {{ copy.detail }}
              </RouterLink>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.publication-section {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 28px 32px;
  border: 1px solid #f1f5f9;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding-bottom: 10px;
  border-bottom: 2px solid #e2e8f0;
}

.section-copy {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.section-title {
  margin: 0;
  font-size: 1.5rem;
  color: #0f172a;
}

.section-description {
  margin: 0;
  color: #64748b;
  font-size: 0.95rem;
}

.section-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.select-all {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #334155;
  font-size: 0.95rem;
}

.download-button {
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 8px 14px;
  font: inherit;
  font-weight: 600;
  color: #334155;
  background: #f1f5f9;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.download-button:hover:not(:disabled) {
  background: #e2e8f0;
  color: #1e293b;
}

.download-button:disabled {
  background: #e2e8f0;
  color: #64748b;
  cursor: not-allowed;
}

.publication-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.publication-card {
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f5f9;
}

.publication-card:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.publication-top {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 14px;
}

.publication-select {
  display: flex;
  align-items: start;
  padding-top: 4px;
}

.publication-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.publication-title,
.publication-authors,
.publication-meta {
  margin: 0;
}

.publication-title {
  font-size: 1.06rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.45;
}

.publication-authors {
  color: #475569;
  line-height: 1.72;
  font-size: 0.95rem;
}

.publication-meta {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
}

.publication-links {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.link-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 14px;
  border-radius: 8px;
  background: #f1f5f9;
  color: #334155;
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid transparent;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.link-chip:hover {
  background: #e2e8f0;
  color: #1e293b;
}

@media (max-width: 640px) {
  .publication-section {
    padding: 20px 22px;
  }

  .publication-top {
    grid-template-columns: 1fr;
  }

  .publication-select {
    padding-top: 0;
  }
}
</style>
