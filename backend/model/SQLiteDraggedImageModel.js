import { Sequelize, DataTypes, ARRAY } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite"
})

const DraggedImage = sequelize.define("DraggedImage", {
    id: {
        type: DataTypes.INTEGER // assigned in upload
    },
    name: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.STRING
    },
    data: {
        type: ARRAY // uint 8 array
    }
})

class SQLiteTaskModel {
    constructor() {}

    async init(fresh = false) {
        await sequelize.authenticate();
        await sequelize.sync({force: true});
    

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
        return await DraggedImage.findAll();
    }

    async delete(draggedImage) {
        if (draggedImage === null) {
            await DraggedImage.destroy({ truncate: true }); 
            return;
        }

        await DraggedImage.destroy({ where: {id: draggedImage.id}})

    }
}

const SQLiteDraggedImageModel = new SQLiteTaskModel();
export default SQLiteDraggedImageModel;