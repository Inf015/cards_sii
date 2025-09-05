<template>
  <div class="card-list">
    <div v-for="c in cards" :key="c.id" class="item">
      <div class="line"><strong>Tarjeta:</strong> {{ masked(c.number) }}</div>
      <div class="line"><strong>Nombre:</strong> {{ c.name }}</div>
      <div class="line"><strong>Vence:</strong> {{ c.expiry }}</div>
    </div>

    <p v-if="!cards?.length" class="empty">No hay tarjetas agregadas.</p>
  </div>
</template>

<script setup>
import { maskCard } from "../utils/formatters.js";

const props = defineProps({
  cards: { type: Array, default: () => [] },
});

const masked = (n) => maskCard(n, { showStart: 4, showEnd: 4 });
</script>

<style scoped>
.card-list {
  display: grid;
  gap: 0.75rem;
  margin-top: 1rem;
}
.item {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 0.75rem 0.9rem;
  background: #fff;
}
.line {
  font-size: 0.95rem;
}
.empty {
  color: #6b7280;
  font-style: italic;
}
</style>
