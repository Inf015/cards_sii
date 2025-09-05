<template>
  <div class="card-list">
    <div v-for="c in cards" :key="c.id" class="item">
      <template v-if="editingId === c.id">
        <div class="line">
          <strong>Tarjeta:</strong>
          <input v-model="draft.number" inputmode="numeric" maxlength="16" />
        </div>
        <div class="line">
          <strong>Nombre:</strong>
          <input v-model="draft.name" maxlength="20" />
        </div>
        <div class="line">
          <strong>Vence:</strong>
          <input v-model="draft.expiry" maxlength="5" placeholder="MM/YY" />
        </div>
        <div class="actions">
          <button @click="save(c.id)">Guardar</button>
          <button class="ghost" @click="cancel()">Cancelar</button>
        </div>
      </template>

      <template v-else>
        <div class="line"><strong>Tarjeta:</strong> {{ masked(c.number) }}</div>
        <div class="line"><strong>Nombre:</strong> {{ c.name }}</div>
        <div class="line"><strong>Vence:</strong> {{ c.expiry }}</div>
        <div class="actions">
          <button @click="edit(c)">Editar</button>
          <button class="ghost" @click="$emit('delete', c.id)">Eliminar</button>
        </div>
      </template>
    </div>

    <p v-if="!cards?.length" class="empty">No hay tarjetas agregadas.</p>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { maskCard } from "../utils/formatters.js";

defineProps({
  cards: { type: Array, default: () => [] },
});
const emit = defineEmits(["delete", "update"]);

const masked = (n) => maskCard(n, { showStart: 2, showEnd: 4 });

const editingId = ref(null);
const draft = reactive({ number: "", name: "", expiry: "" });

function edit(c) {
  editingId.value = c.id;
  draft.number = c.number;
  draft.name = c.name;
  draft.expiry = c.expiry;
}
function cancel() {
  editingId.value = null;
}
function save(id) {
  emit("update", { id, ...draft });
  editingId.value = null;
}
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
  gap: 0.5rem;
}
.line {
  font-size: 0.95rem;
  line-height: 1.4;
  display: grid;
  grid-template-columns: 110px 1fr;
  align-items: center;
  gap: 0.5rem;
}
.line strong {
  font-weight: 600;
  margin-right: 0.25rem;
}
.actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}
input {
  width: 100%;
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  border: 1px solid #4b5563;
  background: #111827;
  color: #f3f4f6;
}
button {
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  border: 1px solid #93c5fd;
  background: #1d4ed8;
  color: #fff;
  cursor: pointer;
}
button:hover {
  background: #1e40af;
}
button.ghost {
  background: transparent;
  border: 1px solid #f87171;
  color: #f87171;
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
