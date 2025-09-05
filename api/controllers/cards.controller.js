import { v4 as uuid } from "uuid";
import * as Repo from "../repositories/file.repository.js";
import { validateRequired } from "../validators/cards.schema.js";

const DB_PATH = new URL("../data/cards.json", import.meta.url).pathname;

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
