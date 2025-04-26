import InMemoryDraggedImageModel from "./InMemoryDraggedImageModel.js"
import JSONWishlistModel from "./JSONWishlistModel.js";
import DraggedImageModel from './DraggedImageModel.js';
import UserModel from './UserModel.js';

class ModelFactory {
    static getDraggedImageModel() {
        return DraggedImageModel;
    }

    getWishlistModel() {
        return JSONWishlistModel;
    }
}

const ModelFactory = new _ModelFactory();

    static getUserModel() {
        return UserModel;
    }
}

export default ModelFactory;