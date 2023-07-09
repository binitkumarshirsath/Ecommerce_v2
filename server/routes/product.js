import express from 'express';
import formidable from 'express-formidable';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import createProductController from '../controller/productController/createProductController.js';
import getProductController from '../controller/productController/getProductController.js';
import getSingleProductController from '../controller/productController/getSingleProductController.js';
import getProductPhotoController from '../controller/productController/getProductPhotoController.js';
import deleteProductController from '../controller/productController/deleteProductController.js';
import updateProductController from '../controller/productController/updateProductController.js';
const router = express.Router();

//Method post Create product
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController);

//Method get Get product
router.get('/get-product',getProductController);

//Method get get single product
router.get('/get-product/:pid',getSingleProductController);

//Method get Get photo
router.get('/get-photo/:pid',getProductPhotoController);

//Method delete Delete product
router.delete('/delete-product/:pid',requireSignIn,isAdmin,deleteProductController);

//Method put Update product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController);

export default router;