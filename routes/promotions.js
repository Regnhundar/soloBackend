import { Router } from "express";
import { getPromotions, addPromotion, togglePromotion } from '../controllers/promotionController.js'
import promotionSchema from "../models/promotionSchema.js";
import joiHandler from "../middleware/joiHandler.js";
import adminAccess from "../middleware/adminAccess.js";

const router = Router();

// http://localhost:1337/promotions
router.get("/", getPromotions);

// http://localhost:1337/promotions
router.post("/", adminAccess, joiHandler(promotionSchema), addPromotion);

// http://localhost:1337/promotions/:id
router.patch("/:id", adminAccess, togglePromotion)

export default router;