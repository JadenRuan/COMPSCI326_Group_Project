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
            console.log("Received POST request to add item to wishlist:", req.body);  // Debug
            // const { productId } = req.body;  // Ensure productId is passed in body
            // if (!req.body || !req.body.productId) {
            //     return res.status(400).json({ message: "Product ID is required" });
            // }
            await WishlistController.addItem(req, res);  // Pass productId as argument
        });

        // Remove item from wishlist
        this.router.delete("/wishlist", async (req, res) => {
            // const { productId } = req.body;  // Ensure productId is passed in body
            // if (!req.body || !req.body.productId) {
            //     return res.status(400).json({ message: "Product ID is required" });
            // }
            await WishlistController.removeItem(req, res);  // Pass productId as argument
        });
    }

    getRouter() {
        return this.router;
    }
}

export default new Routes().getRouter();
