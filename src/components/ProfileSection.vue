<script setup lang="ts">
import type { SiteProfile } from '../data/site'

defineProps<{
  profile: SiteProfile
  emailLabel: string
}>()
</script>

<template>
  <section class="profile-section">
    <div class="profile-card">
      <img
        class="profile-photo"
        :src="profile.photoUrl"
        :alt="profile.name"
      />

      <div class="profile-body">
        <div class="profile-heading">
          <h1 class="profile-name">{{ profile.name }}</h1>
          <p class="profile-title">{{ profile.title }}</p>
        </div>

        <div class="profile-meta">
          <a
            class="profile-link"
            :href="profile.affiliationUrl"
            target="_blank"
            rel="noreferrer"
          >
            {{ profile.affiliation }}
          </a>
          <p class="profile-email">
            {{ emailLabel }}
            <a
              class="profile-email-link"
              :href="`mailto:${profile.email}`"
            >
              {{ profile.email }}
            </a>
          </p>
        </div>
      </div>
    </div>

    <div class="profile-bio-card">
      <p class="profile-bio">{{ profile.bio }}</p>
    </div>
  </section>
</template>

<style scoped>
.profile-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 8px 12px 2px;
  text-align: center;
}

.profile-photo {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 999px;
  border: 4px solid #ffffff;
  box-shadow: 0 6px 24px rgba(15, 23, 42, 0.08);
}

.profile-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 46rem;
}

.profile-heading {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.profile-name {
  margin: 0;
  font-size: clamp(2.2rem, 5vw, 2.7rem);
  line-height: 1.12;
  letter-spacing: 0.02em;
  color: #0f172a;
}

.profile-title {
  margin: 0;
  font-size: 1.22rem;
  font-weight: 500;
  color: #334155;
}

.profile-meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.profile-link {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
}

.profile-link:hover {
  text-decoration: underline;
}

.profile-email {
  margin: 0;
  color: #334155;
  font-size: 1rem;
}

.profile-email-link {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
}

.profile-email-link:hover {
  text-decoration: underline;
}

.profile-bio-card {
  padding: 22px 28px;
  border: 1px solid #f1f5f9;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);
}

.profile-bio {
  margin: 0;
  color: #334155;
  line-height: 1.8;
  text-align: left;
}

@media (max-width: 760px) {
  .profile-photo {
    width: 110px;
    height: 110px;
  }

  .profile-heading {
    gap: 8px;
  }

  .profile-name {
    font-size: 2rem;
  }

  .profile-bio-card {
    padding: 18px 20px;
  }
}
</style>
