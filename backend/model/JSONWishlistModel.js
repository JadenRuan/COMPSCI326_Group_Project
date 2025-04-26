import fs from 'fs/promises';

const FILE = './data/wishlist.json';  // Make sure this file exists with []

class WishlistModel {
    static async readFile() {
        try {
            const data = await fs.readFile(FILE, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            return []; // If file doesn't exist or is empty
        }
    }

    static async writeFile(data) {
        await fs.writeFile(FILE, JSON.stringify(data, null, 2));
    }

    static async getAllItems() {
        return await this.readFile();
    }

    static async addItem(productId) {
        const items = await this.readFile();
        if (!items.includes(productId)) {
            items.push(productId);
            await this.writeFile(items);
        }
        return items;
    }

    static async removeItem(productId) {
        let items = await this.readFile();
        items = items.filter(id => id !== productId);
        await this.writeFile(items);
        return items;
    }
}

export default WishlistModel;
