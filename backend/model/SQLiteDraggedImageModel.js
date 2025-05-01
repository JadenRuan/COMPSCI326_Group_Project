import { Sequelize, DataTypes, ARRAY } from "sequelize";
import path from "path";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.resolve("__dirname", '..', 'database.sqlite'),
    logging: (msg) => console.log("MESSAGE:", msg)
})

const DraggedImage = sequelize.define("DraggedImage", {
    id: {
        type: DataTypes.INTEGER, // assigned in upload
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.STRING
    },
    data: {
        type: DataTypes.BLOB // uint 8 array
    }
})

class _SQLiteDraggedImagekModel {
    constructor() {}

    async init(fresh = false) {
        await sequelize.authenticate();
        await sequelize.sync();
    
        if (fresh) { // new database 
            await this.delete(); // delete old database
        }
    }

    async create(draggedImage) {
        return await DraggedImage.create(draggedImage);
    }

    async read(id = null) {
        if (id) {
            return await DraggedImage.findByPk(id);
        } 

        const savedImages = await DraggedImage.findAll();
        console.log("HOW MANY IMAGES: ", savedImages.length);

        return await DraggedImage.findAll();
    }

    async delete() {
        return await DraggedImage.destroy({ truncate: true }); 
    }
}

const SQLiteDraggedImageModel = new _SQLiteDraggedImagekModel();
export default SQLiteDraggedImageModel;