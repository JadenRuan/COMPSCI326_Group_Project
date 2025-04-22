import ModelFactory from "../model/ModelFactory.js";

class DraggedImageController {
    constructor() {
        this.model = ModelFactory.getDraggedImageModel();
    }

    async addDraggedImage(req, res) {

        await console.log("addDraggedImage");
        await console.log(req.body);

        try {
            if (!req.body || !req.body.data) {
                return res.status(400).json({ error: "Image needs body data." })
            }

            const draggedImage = await this.model.create(req.body); // add to in-memory data structure

            return res.status(201).json(draggedImage);

        } catch (error) {
            return res.status(500).json({ error: "Something went wrong..."})
        }

    }

    async getDraggedImages(req, res) {
        await console.log("getDraggedImages");
    }

}

export default new DraggedImageController();
