<template>
  <div class="card-preview">
    <div class="card-surface">
      <div class="card-top">
        <div class="chip" aria-hidden="true"></div>
        <div class="brand" aria-hidden="true">CARD</div>
      </div>

      <div class="card-number">{{ grouped }}</div>

      <div class="card-bottom">
        <div class="holder">
          <span class="label">CARDHOLDER</span>
          <span class="value">{{ nameView }}</span>
        </div>
        <div class="expiry">
          <span class="label">EXPIRES</span>
          <span class="value">{{ expiryView }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { groupCard, normalizeExpiryForView } from "../utils/formatters.js";

const props = defineProps({
  number: { type: String, default: "" },
  expiry: { type: String, default: "" },
  name: { type: String, default: "" },
});

const grouped = computed(() => groupCard(props.number));
const nameView = computed(() =>
  props.name?.trim() ? props.name.trim().toUpperCase() : "NOMBRE DEL TITULAR"
);
const expiryView = computed(() => normalizeExpiryForView(props.expiry));
</script>

<style scoped>
.card-preview {
  display: grid;
  place-items: center;
}
.card-surface {
  width: 380px;
  aspect-ratio: 1.585/1;
  border-radius: 16px;
  padding: 18px 20px;
  color: #fff;
  background: radial-gradient(120% 120% at 0% 0%, #1f7aec 0%, #0f172a 55%),
    linear-gradient(135deg, #0ea5e9, #4338ca, #0f172a);
  box-shadow: 0 18px 40px rgba(2, 6, 23, 0.3);
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 14px;
}
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chip {
  width: 42px;
  height: 30px;
  border-radius: 6px;
  background: linear-gradient(#f4f4f5, #cbd5e1);
}
.brand {
  font-weight: 700;
  letter-spacing: 0.08em;
  opacity: 0.85;
}
.card-number {
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.08em;
  font-size: 1.35rem;
}
.card-bottom {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}
.label {
  display: block;
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  opacity: 0.75;
  margin-bottom: 4px;
}
.value {
  font-size: 0.95rem;
  font-variant-numeric: tabular-nums;
}
</style>
