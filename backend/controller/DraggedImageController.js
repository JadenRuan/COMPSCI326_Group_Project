import ModelFactory from "../model/ModelFactory.js";

class DraggedImageController {
    // constructor() {
    //     this.model = ModelFactory.getDraggedImageModel();
    // }
    
    constructor() {
        this.getModelPromise = ModelFactory.getModel("sqlite", "forDraggedImage").then((model) => {
            this.model = model;
        })
    }


    async addDraggedImage(req, res) {
        await this.getModelPromise;

        try {
            if (!req.body || !req.body.data) {
                return res.status(400).json({ error: "Image needs body data." })
            }

            const draggedImage = await this.model.create(req.body); // add to in-memory data structure

            return res.status(201).json(draggedImage);

        } catch (error) {
            return res.status(500).json({ error: "Something went wrong..."})

        } finally {
            console.log("model", this.model);
        }

        
    }

    async getDraggedImages(req, res) {
        // await this.getModelPromise;
        await this.getModelPromise;

        const array = await this.model.read(); // gets all images
        res.json( { array } );
    }

    async removeDraggedImage(req, res) {
        await this.getModelPromise;
        await this.model.delete();
        // res.json(await this.model.read());
        // return res.status(201).json(await this.model.read());
        await this.model.read();
    }

}



export default new DraggedImageController();
