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
  return /xiao-?yu du/i.test(author)
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
              <span>{{ publication.venue }}</span>
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
  gap: 20px;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.section-copy {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-title {
  margin: 0;
  font-size: 1.45rem;
  color: #1e3a8a;
}

.section-description {
  margin: 0;
  color: #64748b;
  font-size: 0.96rem;
}

.section-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.select-all {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #334155;
}

.download-button {
  border: 1px solid #cbd5e1;
  border-radius: 999px;
  padding: 10px 16px;
  font: inherit;
  font-weight: 600;
  color: #1e3a8a;
  background: #ffffff;
  cursor: pointer;
  box-shadow: none;
}

.download-button:disabled {
  background: #cbd5e1;
  color: #64748b;
  cursor: not-allowed;
  box-shadow: none;
}

.publication-list {
  display: grid;
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.publication-card {
  border: 1px solid #dbe3f0;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.035);
}

.publication-top {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 16px;
  padding: 18px 20px;
}

.publication-select {
  display: flex;
  align-items: start;
  padding-top: 4px;
}

.publication-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 46rem;
}

.publication-title,
.publication-authors,
.publication-meta {
  margin: 0;
}

.publication-title {
  font-size: 1.02rem;
  color: #1f2937;
  line-height: 1.45;
}

.publication-authors {
  color: #334155;
  line-height: 1.72;
  font-size: 0.97rem;
}

.publication-meta {
  color: #64748b;
  font-size: 0.95rem;
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
  min-width: 56px;
  padding: 7px 11px;
  border-radius: 999px;
  background: #ffffff;
  color: #6a7ba2;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid #dbe3f0;
}

.link-chip:hover {
  background: #f8fafc;
  border-color: #cbd1de;
}

@media (max-width: 640px) {
  .publication-top {
    grid-template-columns: 1fr;
  }

  .publication-select {
    padding-top: 0;
  }
}
</style>
