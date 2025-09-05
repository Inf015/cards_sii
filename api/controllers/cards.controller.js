// api/controllers/cards.controller.js
import { v4 as uuid } from "uuid";
import * as Repo from "../repositories/file.repository.js";
import { validateRequired } from "../validators/cards.schema.js";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.resolve(__dirname, "../data/cards.json");

export async function list(_req, res, next) {
  try {
    const data = await Repo.readJson(DB_PATH);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const { number, name, expiry } = req.body || {};
    const errors = validateRequired({ number, name, expiry });
    if (errors.length) {
      return res
        .status(400)
        .json({ error: "Missing required fields", details: errors });
    }
    const card = {
      id: uuid(),
      number: String(number),
      name: String(name),
      expiry: String(expiry),
    };
    const data = await Repo.readJson(DB_PATH);
    data.push(card);
    await Repo.writeJson(DB_PATH, data);
    res.status(201).json(card);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const { id } = req.params;
    const { number, name, expiry } = req.body || {};

    // Requeridos no vacíos
    if ([number, name, expiry].some((v) => !v || String(v).trim() === "")) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const data = await Repo.readJson(DB_PATH);
    const idx = data.findIndex((c) => String(c.id) === String(id));
    if (idx === -1) return res.status(404).json({ error: "Card not found" });

    data[idx] = {
      ...data[idx],
      number: String(number),
      name: String(name),
      expiry: String(expiry),
    };

    await Repo.writeJson(DB_PATH, data);
    res.json(data[idx]);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const { id } = req.params;
    const data = await Repo.readJson(DB_PATH);
    const idx = data.findIndex((c) => String(c.id) === String(id));
    if (idx === -1) return res.status(404).json({ error: "Card not found" });
    const [deleted] = data.splice(idx, 1);
    await Repo.writeJson(DB_PATH, data);
    res.json({ ok: true, deleted });
  } catch (err) {
    next(err);
  }
}
