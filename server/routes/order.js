import express from 'express';
import { requireSignIn } from '../middleware/authMiddleware.js';
import userOrderController from '../controller/orderController/userOrderController.js';
const router = express.Router();

//get Orders method get
router.get('/user-orders',requireSignIn,userOrderController);

export default router;