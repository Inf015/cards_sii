<script setup>
import { reactive, ref, onMounted } from "vue";
import CardForm from "./components/CardForm.vue";
import CardPreview from "./components/CardPreview.vue";
import CardList from "./components/CardList.vue";
import {
  listCards,
  createCard,
  updateCard,
  deleteCard,
} from "./services/CardRepository.js";

const form = reactive({ number: "", expiry: "", name: "", cvv: "" });
const cards = ref([]);

onMounted(async () => {
  try {
    cards.value = await listCards();
  } catch (e) {
    console.error(e);
  }
});

async function handleSubmit() {
  try {
    const saved = await createCard({
      number: form.number,
      expiry: form.expiry,
      name: form.name,
    });
    cards.value = [...cards.value, saved];
    form.number = form.expiry = form.name = form.cvv = "";
  } catch (e) {
    console.error("Error saving card:", e);
  }
}

async function handleUpdate(payload) {
  try {
    const updated = await updateCard(payload.id, {
      number: payload.number,
      name: payload.name,
      expiry: payload.expiry,
    });
    cards.value = cards.value.map((c) => (c.id === updated.id ? updated : c));
  } catch (e) {
    console.error("Error updating card:", e);
  }
}

async function handleDelete(id) {
  try {
    await deleteCard(id);
    cards.value = cards.value.filter((c) => c.id !== id);
  } catch (e) {
    console.error("Error deleting card:", e);
  }
}

function handleCancel() {
  form.number = form.expiry = form.name = form.cvv = "";
}
</script>

<template>
  <main class="layout">
    <section class="left">
      <CardPreview
        :number="form.number"
        :expiry="form.expiry"
        :name="form.name"
      />
    </section>

    <section class="right">
      <CardForm
        v-model:number="form.number"
        v-model:expiry="form.expiry"
        v-model:name="form.name"
        v-model:cvv="form.cvv"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
      <CardList :cards="cards" @update="handleUpdate" @delete="handleDelete" />
    </section>
  </main>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
  padding: 2rem;
  max-width: 1100px;
  margin: 0 auto;
}
.left {
  display: flex;
  justify-content: center;
}
.right {
  display: grid;
  gap: 1.25rem;
}
@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
