import express from "express";
const router = express.Router();
import registerController from "../controller/registerController.js";
import loginController from "../controller/loginController.js";
import {requireSignIn , isAdmin} from "../middleware/authMiddleware.js"
import test from "../controller/testController.js";
import protectedRoute from "../controller/protectedRoute.js";
import forgetpasswordController from "../controller/forgetPasswordController.js";
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
