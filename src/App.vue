<script setup>
import { reactive } from "vue";
import CardForm from "./components/CardForm.vue";
import CardPreview from "./components/CardPreview.vue";

// estado compartido (única fuente de verdad)
const form = reactive({
  number: "",
  expiry: "",
  name: "",
  cvv: "",
});

// manejar submit (de momento solo resetea)
function handleSubmit() {
  alert("Tarjeta válida agregada 🚀");
  form.number = form.expiry = form.name = form.cvv = "";
}
</script>

<template>
  <main class="layout">
    <!-- vista izquierda: la tarjeta -->
    <section class="left">
      <CardPreview
        :number="form.number"
        :expiry="form.expiry"
        :name="form.name"
      />
    </section>

    <!-- vista derecha: el formulario -->
    <section class="right">
      <CardForm
        v-model:number="form.number"
        v-model:expiry="form.expiry"
        v-model:name="form.name"
        v-model:cvv="form.cvv"
        @submit="handleSubmit"
      />
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
  max-width: 1000px;
  margin: 0 auto;
}
.left {
  display: flex;
  justify-content: center;
}
@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
