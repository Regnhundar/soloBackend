import { Router } from 'express';
import { getMenu, addMenuItem, modifyMenuItem, deleteMenuItem } from '../controllers/menuController.js'
import adminAccess from '../middleware/adminAccess.js';
import menuItemSchema from '../models/menuItemSchema.js';
import joiHandler from '../middleware/joiHandler.js'

const router = Router();

// http://localhost:1337/menu
router.get('/', getMenu);

// http://localhost:1337/menu
router.post('/', adminAccess, joiHandler(menuItemSchema), addMenuItem);

// http://localhost:1337/menu/:id
router.put('/:id', adminAccess, joiHandler(menuItemSchema), modifyMenuItem);

// http://localhost:1337/menu/:id
router.delete('/:id', adminAccess, deleteMenuItem);

export default router