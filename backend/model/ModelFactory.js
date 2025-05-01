import InMemoryDraggedImageModel from "./InMemoryDraggedImageModel.js"
import JSONWishlistModel from "./JSONWishlistModel.js";
import DraggedImageModel from './DraggedImageModel.js';
import UserModel from './UserModel.js';

import 

class ModelFactory {
    async getModel(model = "sqlite", type) {
        if (type === "forDraggedImage") { // draggedImage model 
            if (model === "sqlite") {
                return SQLiteDraggedImageModel;
            } else if (model === "sqlite-fresh") {
                await SQLiteDraggedImageModel.init(true);
                return SQLiteDraggedImageModel;
            } else {
                return InMemoryDraggedImageModel; // in-memory model
            }
        } // else type === YOUR TYPE 
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

const ModelFactory = new ModelFactory();
export default ModelFactory;
