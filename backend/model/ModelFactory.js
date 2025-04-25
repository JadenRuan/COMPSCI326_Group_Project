import InMemoryDraggedImageModel from "./InMemoryDraggedImageModel.js"
import JSONWishlistModel from "./JSONWishlistModel.js";

class _ModelFactory {
    getDraggedImageModel() {
        return InMemoryDraggedImageModel;
    }

    getWishlistModel() {
        return JSONWishlistModel;
    }
}

const ModelFactory = new _ModelFactory();
export default ModelFactory;