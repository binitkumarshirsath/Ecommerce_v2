import express from "express";
const router = express.Router();
import registerController from "../controller/registerController.js";
import loginController from "../controller/loginController.js";
import {requireSignIn , isAdmin} from "../middleware/authMiddleware.js"
import test from "../controller/testController.js";
//Registration : Method POST
router.post("/register",registerController);

//Router Login : Method Post
router.post('/login', loginController);

//Dummy Route for testing purpose
router.post('/test',requireSignIn,isAdmin,test)
export default router;
