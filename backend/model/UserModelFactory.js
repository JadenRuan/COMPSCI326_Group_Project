import { User } from "../db/index.js";
export default class UserModelFactory {
  static getUserModel() {
    return {
      async findByEmail(email) {
        return await User.findOne({ where: { email } });
      },
      async verify(email, rawPwd) {
        const user = await this.findByEmail(email);
        if (!user) return false;
        const { comparePassword } = await import("../src/hash.js");
        return comparePassword(rawPwd, user.password);
      },
      async create(record) {
        const { hashPassword } = await import("../src/hash.js");
        if (record.password) {
          record.password = await hashPassword(record.password);
        }
        return await User.create(record);
      },
      async getAll() {
        return await User.findAll();
      }
    };
  }
}