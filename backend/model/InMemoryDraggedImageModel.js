class _InMemoryDraggedImageModel { 
    static draggedImageID = 1;

    constructor() {
        this.draggedImages = []; // initialize empty array
    }

    async create(draggedImage) {
        draggedImage.id = _InMemoryDraggedImageModel.draggedImageID++;
        this.draggedImages.push(draggedImage);
        return draggedImage;
    }

    async read(id = null) {
        if (id) {
            return this.draggedImages.find((di) => di.id === id);
        } 
        return this.draggedImages;
    }

    async delete(draggedImage = null) {
        if (draggedImage === null) {
            this.draggedImages = [];
            return;
        }
        
        const i = this.draggedImages.findIndex((di) => di.id === draggedImage.id);
        this.draggedImages.splice(i, 1);
        return this.draggedImages;
    }
}

const InMemoryDraggedImageModel = new _InMemoryDraggedImageModel();
export default InMemoryDraggedImageModel;