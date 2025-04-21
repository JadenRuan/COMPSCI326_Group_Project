import express from "express";

class FileDragAndDropRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/dragged-files", async (req, res) => {
            return;
        })
    }

    getRouter() {
        return this.router;
    }

}

export default new FileDragAndDropRoutes().getRouter();
