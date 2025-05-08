import { Sequelize, DataTypes } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.resolve(__dirname, '..', 'database.sqlite'),
    logging: (msg) => console.log("MESSAGE:", msg)
});

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    }
});

class _SQLiteUserModel {
    constructor() {}

    async init(fresh = false) {
        await sequelize.authenticate();
        await sequelize.sync();
        if (fresh) {
            await this.deleteAll();
        }
    }

    async getAll() {
        return await User.findAll();
    }

    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async create(user) {
        return await User.create(user);
    }

    async verify(email, password) {
        const user = await this.findByEmail(email);
        return user && user.password === password;
    }

    async deleteAll() {
        return await User.destroy({ where: {}, truncate: true });
    }
}

const SQLiteUserModel = new _SQLiteUserModel();
export default SQLiteUserModel;