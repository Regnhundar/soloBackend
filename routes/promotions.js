import { Router } from "express";
import { getPromotions, addPromotion } from '../controllers/promotionController.js'
import adminAccess from "../middleware/adminAccess.js";

const router = Router();

// http://localhost:1337/promotions
router.get("/", getPromotions);

// http://localhost:1337/promotions
router.post("/", adminAccess, addPromotion);

export default router;