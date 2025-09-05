<!-- src/App.vue -->
<script setup>
import { reactive, ref, onMounted } from "vue";
import CardForm from "./components/CardForm.vue";
import CardPreview from "./components/CardPreview.vue";
import CardList from "./components/CardList.vue";
import {
  listCards,
  createCard,
  deleteCard,
} from "./services/CardRepository.js";

/** Estado único compartido (fuente de la verdad) */
const form = reactive({
  number: "",
  expiry: "",
  name: "",
  cvv: "",
});

/** Lista de tarjetas (desde el backend) */
const cards = ref([]);

/** Cargar tarjetas al montar el componente */
onMounted(async () => {
  try {
    cards.value = await listCards();
  } catch (e) {
    console.error("Error cargando tarjetas:", e);
  }
});

/** Enviar tarjeta al backend y actualizar lista */
async function handleSubmit() {
  try {
    const saved = await createCard({
      number: form.number,
      expiry: form.expiry,
      name: form.name,
    });
    cards.value = [...cards.value, saved];

    // limpiar form
    form.number = "";
    form.expiry = "";
    form.name = "";
    form.cvv = "";
  } catch (e) {
    console.error("Error guardando tarjeta:", e);
  }
}

/** Eliminar tarjeta del backend y actualizar lista */
async function handleDelete(id) {
  try {
    await deleteCard(id);
    cards.value = cards.value.filter((c) => c.id !== id);
  } catch (e) {
    console.error("Error eliminando tarjeta:", e);
  }
}

/** Cancelar = limpiar formulario */
function handleCancel() {
  form.number = "";
  form.expiry = "";
  form.name = "";
  form.cvv = "";
}
</script>

<template>
  <main class="layout">
    <!-- Preview a la izquierda -->
    <section class="left">
      <CardPreview
        :number="form.number"
        :expiry="form.expiry"
        :name="form.name"
      />
    </section>

    <!-- Form + Lista a la derecha -->
    <section class="right">
      <CardForm
        v-model:number="form.number"
        v-model:expiry="form.expiry"
        v-model:name="form.name"
        v-model:cvv="form.cvv"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />

      <CardList :cards="cards" @delete="handleDelete" />
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
