<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import ProfileSection from '../components/ProfileSection.vue'
import PublicationSection from '../components/PublicationSection.vue'
import SiteSection from '../components/SiteSection.vue'
import { publications } from '../data/publications'
import { siteContentByLocale, type Locale } from '../data/site'

const localeStorageKey = 'site-locale'

const localeOptions: Array<{ value: Locale; label: string }> = [
  { value: 'zh', label: '中文' },
  { value: 'en', label: 'EN' },
]

const pageCopyByLocale = {
  en: {
    localeLabel: 'Language',
    emailLabel: 'Email:',
    publications: {
      title: 'Publications',
      description: 'Publication data is loaded from BibTeX and can be exported in bulk.',
      selectAll: 'Select all',
      downloadBibtex: 'Download BibTeX',
      detail: 'Detail',
      doi: 'DOI',
    },
  },
  zh: {
    localeLabel: '语言',
    emailLabel: '邮箱：',
    publications: {
      title: '论文发表',
      description: '论文信息从 BibTeX 读取，可多选后批量导出。',
      selectAll: '全选',
      downloadBibtex: '下载 BibTeX',
      detail: '详情',
      doi: 'DOI',
    },
  },
} satisfies Record<
  Locale,
  {
    localeLabel: string
    emailLabel: string
    publications: {
      title: string
      description: string
      selectAll: string
      downloadBibtex: string
      detail: string
      doi: string
    }
  }
>

function resolveInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'en'
  }

  const storedLocale = window.localStorage.getItem(localeStorageKey)

  if (storedLocale === 'zh' || storedLocale === 'en') {
    return storedLocale
  }

  return window.navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

const locale = ref<Locale>(resolveInitialLocale())

const pageCopy = computed(() => pageCopyByLocale[locale.value])
const siteContent = computed(() => siteContentByLocale[locale.value])

watch(
  locale,
  (value) => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(localeStorageKey, value)
    document.documentElement.lang = value === 'zh' ? 'zh-CN' : 'en'
  },
  { immediate: true },
)
</script>

<template>
  <main class="page-shell">
    <div class="page-content">
      <div class="page-toolbar">
        <div
          class="locale-switch"
          role="group"
          :aria-label="pageCopy.localeLabel"
        >
          <button
            v-for="option in localeOptions"
            :key="option.value"
            class="locale-button"
            :class="{ 'locale-button-active': locale === option.value }"
            type="button"
            :aria-pressed="locale === option.value"
            @click="locale = option.value"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <ProfileSection
        :profile="siteContent.profile"
        :email-label="pageCopy.emailLabel"
      />

      <PublicationSection
        :publications="publications"
        :copy="pageCopy.publications"
      />

      <SiteSection
        :title="siteContent.professionalServicesTitle"
        :items="siteContent.professionalServices"
      />

      <SiteSection
        :title="siteContent.teachingTitle"
        :items="siteContent.teaching"
      />

      <footer class="site-footer">
        <p class="site-footer-text">
          {{ siteContent.siteNote.lastUpdateLabel }}{{ siteContent.siteNote.lastUpdate }}{{ siteContent.siteNote.creditIntro }}
          <template
            v-for="(credit, index) in siteContent.siteNote.credits"
            :key="credit.url"
          >
            <a
              class="site-footer-link"
              :href="credit.url"
              target="_blank"
              rel="noreferrer"
            >
              {{ credit.label }}
            </a>
            <span v-if="index < siteContent.siteNote.credits.length - 1">{{ siteContent.siteNote.creditSeparator }}</span>
          </template>
          {{ siteContent.siteNote.closingMark }}
        </p>
      </footer>
    </div>
  </main>
</template>

<style scoped>
.page-shell {
  min-height: 100vh;
  padding: 34px 20px 38px;
  box-sizing: border-box;
}

.page-content {
  width: min(1000px, 100%);
  margin: 0 auto;
  display: grid;
  gap: 22px;
}

.page-toolbar {
  display: flex;
  justify-content: flex-end;
}

.locale-switch {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border: 1px solid #e2e8f0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);
}

.locale-button {
  border: 0;
  border-radius: 999px;
  padding: 8px 14px;
  color: #64748b;
  background: transparent;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.locale-button:hover {
  color: #2563eb;
}

.locale-button-active {
  color: #2563eb;
  background: #eff6ff;
  font-weight: 600;
}

.site-footer {
  margin-top: 4px;
  text-align: center;
}

.site-footer-text {
  margin: 0;
  color: #94a3b8;
  line-height: 1.8;
  font-size: 0.88rem;
}

.site-footer-link {
  color: #64748b;
  text-decoration: none;
}

.site-footer-link:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .page-shell {
    padding: 24px 14px 28px;
  }
}
</style>
