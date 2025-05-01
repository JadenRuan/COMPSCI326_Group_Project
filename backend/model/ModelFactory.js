import InMemoryDraggedImageModel from "./InMemoryDraggedImageModel.js"
import JSONWishlistModel from "./JSONWishlistModel.js";
// import DraggedImageModel from './DraggedImageModel.js';
import UserModel from './UserModel.js';

class _ModelFactory {
    getDraggedImageModel() {
        return InMemoryDraggedImageModel;
    }

    getWishlistModel() {
        return JSONWishlistModel;
    }

    getUserModel() {
        return UserModel;
    }
}

const ModelFactory = new _ModelFactory();
export default ModelFactory;