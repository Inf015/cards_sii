// api/routes/cards.routes.js
import { Router } from "express";
import * as Cards from "../controllers/cards.controller.js";

const router = Router();

router.get("/", Cards.list);
router.post("/", Cards.create);
router.delete("/:id", Cards.remove); // <-- add this

export default router;
