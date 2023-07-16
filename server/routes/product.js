import express from 'express';
import formidable from 'express-formidable';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import createProductController from '../controller/productController/createProductController.js';
import getProductController from '../controller/productController/getProductController.js';
import getSingleProductController from '../controller/productController/getSingleProductController.js';
import getProductPhotoController from '../controller/productController/getProductPhotoController.js';
import deleteProductController from '../controller/productController/deleteProductController.js';
import updateProductController from '../controller/productController/updateProductController.js';
import filteredProductController from '../controller/productController/filteredProductController.js';
import getProductbyCategory from '../controller/productController/getProductbyCategory.js';
import totalProductCountController from '../controller/productController/totalProductCountController.js';
import getProductPageWiseController from '../controller/productController/getProductPageWiseController.js';
import searchedProductController from '../controller/productController/searchedProductController.js';
import similarProductController from '../controller/productController/similarProductController.js';
const router = express.Router();

//Method post Create product
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController);

//Method get Get product
router.get('/get-product',getProductController);

//Method get get single product
router.get('/get-product/:slug',getSingleProductController);

//Method get Get photo
router.get('/get-photo/:pid',getProductPhotoController);

//Method delete Delete product
router.delete('/delete-product/:pid',requireSignIn,isAdmin,deleteProductController);

//Method put Update product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController);

//Method post Filter Products
router.post('/filtered-products',filteredProductController);

//Method get Get product by category
router.get('/product-category/:slug',getProductbyCategory);

//Mehtod get , get total count 
router.get('/product-count',totalProductCountController);

//Method get , get product page wise
router.get('/:page',getProductPageWiseController);

//Method post get prodct based on search
router.post('/search/:keywords',searchedProductController);

//Method get , similar product basaed on category
router.get('/related-product/:pid/:cid',similarProductController);


export default router;