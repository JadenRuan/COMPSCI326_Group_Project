// backend/route/AuthRoutes.js
import express from "express";
import AuthController from "../controller/AuthController.js";

const router = express.Router();
router.post("/register", AuthController.register);
router.post("/login",    AuthController.login);
router.get ("/users",    AuthController.listAll);  
export default router;
