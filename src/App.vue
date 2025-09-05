<!-- src/App.vue -->
<script setup>
import { reactive } from "vue";
import CardForm from "./components/CardForm.vue";
import CardPreview from "./components/CardPreview.vue";
import CardList from "./components/CardList.vue";

/** Estado único compartido (fuente de la verdad) */
const form = reactive({
  number: "",
  expiry: "",
  name: "",
  cvv: "",
});

/** Lista de tarjetas agregadas */
const cards = reactive([]);

/** Agregar tarjeta válida a la lista y limpiar el formulario */
function handleSubmit() {
  const id =
    (crypto?.randomUUID && crypto.randomUUID()) ||
    String(Date.now()) + Math.random().toString(16).slice(2);

  cards.push({
    id,
    number: form.number,
    expiry: form.expiry,
    name: form.name,
  });

  // limpiar form
  form.number = "";
  form.expiry = "";
  form.name = "";
  form.cvv = "";
}

/** Cancelar = limpiar formulario (opcional manejar otras cosas) */
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

      <CardList :cards="cards" />
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
