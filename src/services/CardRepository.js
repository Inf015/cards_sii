// src/services/CardRepository.js
const BASE = "http://localhost:3001";

export async function listCards() {
  const res = await fetch(`${BASE}/cards`);
  if (!res.ok) throw new Error("GET /cards failed");
  return res.json();
}

export async function createCard(payload) {
  const res = await fetch(`${BASE}/cards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "POST /cards failed");
  }
  return res.json();
}
export async function updateCard(id, payload) {
  const res = await fetch(`${BASE}/cards/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "PUT /cards failed");
  }
  return res.json();
}

export async function deleteCard(id) {
  const res = await fetch(`${BASE}/cards/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "DELETE /cards failed");
  }
  return res.json();
}
