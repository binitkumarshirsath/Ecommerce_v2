import express from 'express';
import { requireSignIn } from '../middleware/authMiddleware.js';
import { braintreePaymentController, braintreeTokenController } from '../controller/paymentController/paymentController.js';
const router = express.Router();

router.get('/braintree/token',requireSignIn,braintreeTokenController);

router.post('/braintree/payment',requireSignIn,braintreePaymentController);

export default router;
