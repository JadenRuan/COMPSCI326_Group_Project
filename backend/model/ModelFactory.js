import InMemoryDraggedImageModel from "./InMemoryDraggedImageModel.js";
import JSONWishlistModel from "./JSONWishlistModel.js";
// import DraggedImageModel from './DraggedImageModel.js';
// import UserModel from './UserModel.js';
import SQLiteWishlistModel from "./SQLiteWishlistModel.js";

import SQLiteDraggedImageModel from "./SQLiteDraggedImageModel.js";

class _ModelFactory {
    async getModel(model = "sqlite", type) {
        if (type === "forDraggedImage") { // draggedImage model 
            if (model === "sqlite") {
                console.log("SAME DATABASE")
                await SQLiteDraggedImageModel.init(false);
                return SQLiteDraggedImageModel;
            } else if (model === "sqlite-fresh") {
                console.log("FRESH DATABASE");
                await SQLiteDraggedImageModel.init(true);
                return SQLiteDraggedImageModel;
            } else {
                return InMemoryDraggedImageModel; // in-memory model
            }
        }
        
        if (type === "forWishlist") { // wishlist model
            if (model === "sqlite") {
                await console.log("SAME DATABASE")
                await SQLiteWishlistModel.init(false);
                return SQLiteWishlistModel;
            } else if (model === "sqlite-fresh") {
                await console.log("FRESH DATABASE");
                await SQLiteWishlistModel.init(true);
                return SQLiteWishlistModel;
            } else {
                return JSONWishlistModel ; // json model
            }
            
        }
    }
}



// class ModelFactory {
//     static getDraggedImageModel() {
//         return DraggedImageModel;
//     }

//     getWishlistModel() {
//         return JSONWishlistModel;
//     }

//     // gave me error down
//     static getUserModel() {
//         return UserModel;
//     }
// }

const ModelFactory = new _ModelFactory();
export default ModelFactory;
