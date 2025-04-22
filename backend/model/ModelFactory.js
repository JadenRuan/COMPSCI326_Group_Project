import InMemoryDraggedImageModel from "./InMemoryDraggedImageModel.js";

class _ModelFactory {
    getDraggedImageModel() {
        return InMemoryDraggedImageModel;
    }
}

const ModelFactory = new _ModelFactory();
export default ModelFactory;