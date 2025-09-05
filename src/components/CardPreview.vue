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
  position: relative;
  display: grid;
  place-items: center;
  padding: 8px;
}
.card-preview::before {
  content: "";
  position: absolute;
  width: 86%;
  height: 70%;
  border-radius: 24px;
  background: radial-gradient(
      55% 45% at 35% 20%,
      rgba(59, 130, 246, 0.28),
      transparent 60%
    ),
    radial-gradient(
      35% 35% at 70% 60%,
      rgba(59, 130, 246, 0.18),
      transparent 60%
    );
  filter: blur(28px);
  z-index: 0;
}

.card-surface {
  position: relative;
  z-index: 1;
  width: 420px;
  aspect-ratio: 1.585 / 1;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: radial-gradient(120% 120% at 0% 0%, #1f7aec 0%, #0b1835 48%)
      no-repeat,
    linear-gradient(145deg, #0a64d0 0%, #132246 45%, #0b1220 100%);
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.55), 0 8px 24px rgba(2, 6, 23, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  padding: 20px 22px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 16px;
  overflow: hidden;
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
  font-size: 1.5rem;
  line-height: 1.15;
  word-spacing: 0.25em;
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
.chip {
  width: 48px;
  height: 36px;
  border-radius: 6px;
  background: linear-gradient(
    135deg,
    #d1d5db,
    #6b7280 40%,
    #9ca3af 70%,
    #f3f4f6
  );
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.6),
    inset -2px -2px 4px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.4);
  margin-bottom: 12px;
}
</style>
