<script setup lang="ts">
defineProps<{
  title: string
  items: string[]
}>()
</script>

<template>
  <section class="section-card">
    <h2 class="section-title">{{ title }}</h2>
    <ul class="item-list">
      <li
        v-for="item in items"
        :key="item"
        class="item-entry"
      >
        {{ item }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
.section-card {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 28px 32px;
  border: 1px solid #f1f5f9;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);
}

.section-title {
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #e2e8f0;
  font-size: 1.5rem;
  color: #0f172a;
}

.item-list {
  margin: 0;
  padding-left: 24px;
  color: #334155;
}

.item-entry {
  margin: 0;
  font-size: 1rem;
  line-height: 1.7;
}

.item-entry + .item-entry {
  margin-top: 8px;
}

@media (max-width: 640px) {
  .section-card {
    padding: 20px 22px;
  }
}
</style>
