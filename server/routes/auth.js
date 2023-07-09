import express from "express";
const router = express.Router();
import registerController  from "../controller/authController/registerController.js";
import loginController from "../controller/authController/loginController.js";
import { isAdmin,requireSignIn } from "../middleware/authMiddleware.js";
import test from "../controller/testController.js";
import protectedRoute from "../controller/authController/protectedRoute.js";
import forgetpasswordController from "../controller/authController/forgetPasswordController.js";
//Registration : Method POST
router.post("/register",registerController);

//Router Login : Method Post
router.post('/login', loginController);

//Dummy Route for testing purpose
router.post('/test',requireSignIn,isAdmin,test)

//Private Route
router.get('/user-dashboard',requireSignIn,protectedRoute)

//Protected Route
router.get('/admin-dashboard',requireSignIn,isAdmin,protectedRoute);

//Forget password : Method post
router.post('/forgetpassword',forgetpasswordController)

export default router;
