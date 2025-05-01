import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '../data/users.json');

function readData() {
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, 'utf-8') || '[]');
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

class UserModel {
    getAll() {
        return readData();
    }

    findByEmail(email) {
        return this.getAll().find(user => user.email === email);
    }

    create(user) {
        const users = this.getAll();
        users.push(user);
        writeData(users);
        return user;
    }

    verify(email, password) {
        const user = this.findByEmail(email);
        return user && user.password === password;
    }
}

export default new UserModel();