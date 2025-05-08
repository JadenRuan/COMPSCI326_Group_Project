// backend/route/AuthRoutes.js
import express from "express";
import AuthController from "../controller/AuthController.js";

const router = express.Router();

// POST /api/register — handled via AuthController
router.post("/register", AuthController.register);

// You can add other auth-related routes here, like login, etc.
router.post("/login", AuthController.login);

export default router;
