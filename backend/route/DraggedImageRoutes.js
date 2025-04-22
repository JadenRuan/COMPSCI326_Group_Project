import express from "express";
import DraggedImageController from "../controller/DraggedImageController.js";

class Routes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/dragged-images", async (req, res) => {
            await DraggedImageController.getDraggedImages(req, res);
        });

        this.router.post("/dragged-images", async (req, res) => {
            await DraggedImageController.addDraggedImage(req, res);
        })

        this.router.delete("/dragged-images", async (req, res) => {
            await DraggedImageController.removeDraggedImage(req, res);
        })

    }

    getRouter() {
        return this.router;
    }

}

export default new Routes().getRouter();