import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import express from "express";
import createCategoryController from "../controller/categoryController/createCategoryController.js";
import updateCategoryController from "../controller/categoryController/updateCategoryController.js";
import readCategoryController from "../controller/categoryController/readCategoryController.js";
import deleteCategoryController from "../controller/categoryController/deleteCategoryController.js";
import getAllCategoryController from "../controller/categoryController/getAllCategoryController.js";
const router = express.Router();


//Method post CreateCategory
router.post('/create-category',requireSignIn,isAdmin,createCategoryController);

//Method put Update category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController);

//Method get Read  single category
router.get('/get-category/:slug',readCategoryController);

//Method get Read all categories 
router.get('/get-category',getAllCategoryController);

//Method delete Delete Category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController);

export default router;