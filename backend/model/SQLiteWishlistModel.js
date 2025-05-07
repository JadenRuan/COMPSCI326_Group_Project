import { Sequelize, DataTypes } from "sequelize";
import path from "path";

// SQLite database connection
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.resolve("__dirname", '..', 'database.sqlite'),
    logging: (msg) => console.log("MESSAGE:", msg)
});

const Wishlist = sequelize.define("Wishlist", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

class _SQLiteWishlistModel {
    constructor() {}

    async init(fresh = false) {
        await sequelize.authenticate();
        await sequelize.sync();

        if (fresh) {
            await this.delete(); // delete old database
        }
    }

    async addItem(wishlist) {
        try {
            const newWishlist = Wishlist.create(wishlist);
            return newWishlist;
        } catch (error) {
            console.error("Error adding wishlist:", error);
            throw error;
        }
    }

    async getAllItems(id = null) {
    await console.log("Fetching wishlist");
        try {
            return await Wishlist.findAll();
        } catch (error) {
            console.error("Error fetching wishlist:", error);
            throw error;
        }
    }

    async removeItem(item) {
        await console.log("Removing wishlist:", item);
        try {
            const wishlist = await Wishlist.findByPk(item.id);
            if (wishlist) {
                await wishlist.destroy();
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error removing wishlist:", error);
            throw error;
        }
    }
}

const SQLiteWishlistModel = new _SQLiteWishlistModel();
export default SQLiteWishlistModel;