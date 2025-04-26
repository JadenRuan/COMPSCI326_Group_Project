import express from "express";
import WishlistController from "../controller/WishlistController.js"; 

class Routes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Get all items in wishlist
        this.router.get("/wishlist", async (req, res) => {
            await WishlistController.getWishlist(req, res);
        });

        // Add item to wishlist
        this.router.post("/wishlist", async (req, res) => {
            await WishlistController.addItem(req, res);
        });

        // Remove item from wishlist
        this.router.delete("/wishlist", async (req, res) => {
            await WishlistController.removeItem(req, res);
        });
    }

    getRouter() {
        return this.router;
    }
}

export default new Routes().getRouter();
