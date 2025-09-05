<template>
  <div class="card-list">
    <div v-for="c in cards" :key="c.id" class="item">
      <div class="line"><strong>Tarjeta:</strong> {{ masked(c.number) }}</div>
      <div class="line"><strong>Nombre:</strong> {{ c.name }}</div>
      <div class="line"><strong>Vence:</strong> {{ c.expiry }}</div>

      <div class="actions">
        <button class="ghost" @click="$emit('delete', c.id)">Eliminar</button>
      </div>
    </div>

    <p v-if="!cards?.length" class="empty">No hay tarjetas agregadas.</p>
  </div>
</template>

<script setup>
import { maskCard } from "../utils/formatters.js";

defineProps({
  cards: { type: Array, default: () => [] },
});

defineEmits(["delete"]);

const masked = (n) => maskCard(n, { showStart: 2, showEnd: 4 });
</script>

<style scoped>
.card-list {
  display: grid;
  gap: 0.75rem;
  margin-top: 1rem;
}
.item {
  border: 1px solid #374151;
  border-radius: 16px;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, #1f2937, #111827);
  color: #f3f4f6;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
  display: grid;
  gap: 0.35rem;
}
.line {
  font-size: 0.95rem;
  line-height: 1.4;
}
.line strong {
  font-weight: 600;
  margin-right: 0.25rem;
}
.actions {
  margin-top: 0.5rem;
  display: flex;
  justify-content: flex-end;
}
button.ghost {
  background: transparent;
  border: 1px solid #f87171;
  color: #f87171;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.2s, color 0.2s;
}
button.ghost:hover {
  background: #f87171;
  color: #111827;
}
.empty {
  color: #6b7280;
  font-style: italic;
}
</style>
