import { Router } from 'express';
import { getMenu, addMenuItem } from '../controllers/menuController.js'
import adminAccess from '../middleware/adminAccess.js';
import menuItemSchema from '../models/menuItemSchema.js';
import joiHandler from '../middleware/joiHandler.js'

const router = Router();

// http://localhost:1337/menu
router.get('/', getMenu);

router.post('/', adminAccess, joiHandler(menuItemSchema), addMenuItem)

export default router