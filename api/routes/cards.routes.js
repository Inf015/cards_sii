import { Router } from "express";
import * as Cards from "../controllers/cards.controller.js";

const router = Router();

// listar todas las tarjetas
router.get("/", Cards.list);

// crear una nueva tarjeta
router.post("/", Cards.create);

export default router;
