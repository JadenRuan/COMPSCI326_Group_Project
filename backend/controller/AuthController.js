// backend/controller/AuthController.js
import UserModelFactory from "../model/UserModelFactory.js";
const model = UserModelFactory.getUserModel();

class AuthController {
  static async register(req, res) {
    const record = { ...req.body };
    const { email } = record;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (await model.findByEmail(email)) {
      return res.status(400).json({ message: "User already exists" });
    }

    await model.create(record);
    return res.status(201).json({ message: "Registered successfully" });
  }

  static async login(req, res) {
    const { email, password } = req.body;
    if (!(await model.verify(email, password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    return res.status(200).json({ message: "Login successful", email });
  }

  static async listAll(req, res) {
    const users = await model.getAll();
    return res.json(users);
  }
}

export default AuthController;
