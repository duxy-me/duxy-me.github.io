<script setup lang="ts">
import type { SiteProfile } from '../data/site'

defineProps<{
  profile: SiteProfile
  emailLabel: string
}>()
</script>

<template>
  <section class="profile-card">
    <img
      class="profile-photo"
      :src="profile.photoUrl"
      :alt="profile.name"
    />

    <div class="profile-body">
      <div class="profile-heading">
        <p class="profile-badge">{{ profile.title }}</p>
        <h1 class="profile-name">{{ profile.name }}</h1>
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

      <p class="profile-bio">{{ profile.bio }}</p>
    </div>
  </section>
</template>

<style scoped>
.profile-card {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 28px;
  align-items: start;
}

.profile-photo {
  width: 220px;
  height: 280px;
  object-fit: cover;
  border-radius: 24px;
  border: 1px solid #d6deea;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
}

.profile-body {
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 42rem;
}

.profile-heading {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.profile-badge {
  margin: 0;
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #6a7ba2;
}

.profile-name {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.9rem);
  line-height: 1.15;
  color: #1e3a8a;
}

.profile-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.profile-link {
  color: #1e3a8a;
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: #cbd1de;
  text-underline-offset: 0.16em;
}

.profile-link:hover {
  text-decoration: underline;
}

.profile-email {
  margin: 0;
  color: #64748b;
  font-size: 0.96rem;
}

.profile-email-link {
  color: #6a7ba2;
  text-decoration: underline;
  text-decoration-color: #cbd1de;
  text-underline-offset: 0.16em;
}

.profile-bio {
  margin: 0;
  color: #334155;
  line-height: 1.78;
  text-align: left;
}

@media (max-width: 760px) {
  .profile-card {
    grid-template-columns: 1fr;
  }

  .profile-photo {
    width: min(220px, 100%);
    height: auto;
  }
}
</style>
