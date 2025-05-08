import express from "express";
import AuthController from "../controller/AuthController.js";

class AuthRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post("/register", (req, res) => AuthController.register(req, res));
        this.router.post("/login", (req, res) => AuthController.login(req, res));
    }

    getRouter() {
        return this.router;
    }
}

export default new AuthRoutes().getRouter();

function deleteHandler() {
    console.log("Deleting");
    IN_MEMORY_FILES = [];
    LOCAL_FILES = [];
}