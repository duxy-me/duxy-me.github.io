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
        class="item-card"
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
}

.section-title {
  margin: 0;
  font-size: 1.45rem;
  color: #1e3a8a;
}

.item-list {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.item-card {
  padding: 14px 18px;
  border: 1px solid #dbe3f0;
  border-radius: 16px;
  background: #ffffff;
  color: #334155;
  line-height: 1.65;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.03);
}
</style>
