import { Router } from "express";
import * as Cards from "../controllers/cards.controller.js";

const router = Router();

router.get("/", Cards.list);
router.post("/", Cards.create);
router.put("/:id", Cards.update);
router.delete("/:id", Cards.remove);

export default router;
