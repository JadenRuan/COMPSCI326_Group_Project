import DraggedImageModel from './DraggedImageModel.js';
import UserModel from './UserModel.js';

class ModelFactory {
    static getDraggedImageModel() {
        return DraggedImageModel;
    }

    static getUserModel() {
        return UserModel;
    }
}

export default ModelFactory;