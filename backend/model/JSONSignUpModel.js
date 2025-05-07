// backend/model/JSONSignUpModel.js
import fs from "fs/promises";
import path from "path";
import { hashPassword, comparePassword } from "../src/hash.js";

const FILE = path.resolve("backend", "data", "users.json");

class JSONSignUpModel {
  static async readFile() {
    try {
      const raw = await fs.readFile(FILE, "utf-8");
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  static async writeFile(data) {
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(data, null, 2));
  }

  static async getAll() {
    return this.readFile();
  }

  static async findByEmail(email) {
    const users = await this.readFile();
    return users.find(u => u.email === email);
  }

  static async create(record) {
    const users = await this.readFile();
    if (record.password) {
      record.password = await hashPassword(record.password);
    }
    users.push(record);
    await this.writeFile(users);
    return record;
  }

  static async verify(email, rawPwd) {
    const user = await this.findByEmail(email);
    if (!user || !user.password) return false;
    return comparePassword(rawPwd, user.password);
  }
}

export default JSONSignUpModel;
