import modelFactory from '../model/ModelFactory.js';

class WishlistController {
    constructor() {
        this.model = modelFactory.getWishlistModel();
    }

    async addItem(req, res) {
        try {
            if (!req.body || !req.body.id) {
                return res.status(400).json({ error: "Invalid item data." });
            }

            const task = await this.model.addItem(newItem); //add to json file
            return res.status(201).json(task);

        } catch (error) {
            console.error("Error in addItem:", error);
            return res.status(500).json({ message: "Error adding item to wishlist." });
        }
    }

    async removeItem(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: "Item ID is required." });
            }

            await this.model.removeItem(id);
            return res.status(200).json({ message: "Item removed from wishlist." });
        } catch (error) {
            console.error("Error in removeItem:", error);
            return res.status(500).json({ message: "Error removing item from wishlist." });
        }
    }

    async getWishlist(req, res) {
        try {
            const items = await this.model.getAllItems();
            return res.status(200).json({ items });
        } catch (error) {
            console.error("Error in getWishlist:", error);
            return res.status(500).json({ message: "Error retrieving wishlist." });
        }
    }
}

export default new WishlistController();
