<template>
  <form @submit.prevent="onSubmit" novalidate class="card-form">
    <!-- Número -->
    <div class="field">
      <label for="cardNumber">Número de Tarjeta</label>
      <input
        id="cardNumber"
        inputmode="numeric"
        autocomplete="cc-number"
        :value="number"
        @input="(e) => updateNumber(e.target.value)"
        @blur="validateNumber"
        maxlength="19"
        :aria-invalid="!!errors.number"
        placeholder="1234567812345678"
      />
      <p v-if="errors.number" class="error">{{ errors.number }}</p>
    </div>

    <!-- Expiry -->
    <div class="field">
      <label for="expiry">Fecha Vencimiento (MM/YY)</label>
      <input
        id="expiry"
        inputmode="numeric"
        autocomplete="cc-exp"
        :value="expiry"
        @input="(e) => updateExpiry(e.target.value)"
        @blur="validateExpiry"
        maxlength="5"
        :aria-invalid="!!errors.expiry"
        placeholder="MM/YY"
      />
      <p v-if="errors.expiry" class="error">{{ errors.expiry }}</p>
    </div>

    <!-- Nombre -->
    <div class="field">
      <label for="holderName">Nombre Titular</label>
      <input
        id="holderName"
        autocomplete="cc-name"
        :value="name"
        @input="(e) => updateName(e.target.value)"
        @blur="validateName"
        maxlength="20"
        :aria-invalid="!!errors.name"
        placeholder="Nombre Apellido"
      />
      <p v-if="errors.name" class="error">{{ errors.name }}</p>
    </div>

    <!-- CVV -->
    <div class="field">
      <label for="cvv">CVV</label>
      <input
        id="cvv"
        type="password"
        inputmode="numeric"
        autocomplete="cc-csc"
        :value="cvv"
        @input="(e) => updateCvv(e.target.value)"
        @blur="validateCvv"
        maxlength="4"
        :aria-invalid="!!errors.cvv"
        placeholder="123"
      />
      <p v-if="errors.cvv" class="error">{{ errors.cvv }}</p>
    </div>

    <!-- Acciones -->
    <div class="actions">
      <button type="submit">Agregar tarjeta</button>
      <button type="button" class="ghost" @click="onCancel">Cancelar</button>
    </div>
  </form>
</template>

<script setup>
import { reactive } from "vue";
import {
  normalizeCardNumberInput,
  normalizeExpiryInput,
  normalizeNameInput,
  normalizeCvvInput,
} from "../utils/formatters.js";
import {
  isCardNumber,
  isExpiryMmYy,
  isName,
  isCvv,
} from "../utils/validation.js";

const props = defineProps({
  number: { type: String, default: "" },
  expiry: { type: String, default: "" },
  name: { type: String, default: "" },
  cvv: { type: String, default: "" },
});

const emit = defineEmits([
  "update:number",
  "update:expiry",
  "update:name",
  "update:cvv",
  "submit",
  "cancel",
]);

// funciones para emitir actualizaciones normalizadas
function updateNumber(v) {
  emit("update:number", normalizeCardNumberInput(v));
}
function updateExpiry(v) {
  emit("update:expiry", normalizeExpiryInput(v));
}
function updateName(v) {
  emit("update:name", normalizeNameInput(v));
}
function updateCvv(v) {
  emit("update:cvv", normalizeCvvInput(v));
}

const errors = reactive({ number: "", expiry: "", name: "", cvv: "" });

// validaciones individuales
function validateNumber() {
  errors.number = props.number
    ? isCardNumber(props.number)
      ? ""
      : "Debe tener 16 dígitos."
    : "Requerido.";
}
function validateExpiry() {
  errors.expiry = props.expiry
    ? isExpiryMmYy(props.expiry)
      ? ""
      : "Formato o rango inválido."
    : "Requerido.";
}
function validateName() {
  errors.name = props.name
    ? isName(props.name)
      ? ""
      : "Solo letras (máx. 20)."
    : "Requerido.";
}
function validateCvv() {
  errors.cvv = props.cvv
    ? isCvv(props.cvv)
      ? ""
      : "3 o 4 dígitos."
    : "Requerido.";
}

function onSubmit() {
  validateNumber();
  validateExpiry();
  validateName();
  validateCvv();
  if (!errors.number && !errors.expiry && !errors.name && !errors.cvv) {
    emit("submit");
  }
}

function onCancel() {
  emit("update:number", "");
  emit("update:expiry", "");
  emit("update:name", "");
  emit("update:cvv", "");
  errors.number = errors.expiry = errors.name = errors.cvv = "";
  emit("cancel");
}
</script>

<style scoped>
.card-form {
  display: grid;
  gap: 1rem;
  max-width: 420px;
}
.field {
  display: grid;
  gap: 0.35rem;
}
label {
  font-weight: 600;
}
input {
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #d0d5dd;
  font-size: 0.95rem;
}
input[aria-invalid="true"] {
  border-color: #d92d20;
  background: #fff1f0;
}
.error {
  color: #d92d20;
  font-size: 0.85rem;
}
.actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
button {
  padding: 0.6rem 0.9rem;
  border-radius: 8px;
  border: 1px solid #111827;
  background: #111827;
  color: #fff;
  cursor: pointer;
}
button.ghost {
  background: transparent;
  color: #111827;
}
</style>
