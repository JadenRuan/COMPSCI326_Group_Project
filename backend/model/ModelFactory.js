import InMemoryDraggedImageModel from "./InMemoryDraggedImageModel.js";
// import JSONWishlistModel from "./JSONWishlistModel.js";
// import DraggedImageModel from './DraggedImageModel.js';
// import UserModel from './UserModel.js';

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
