import ModelFactory from "../model/ModelFactory.js";

const userModel = ModelFactory.getUserModel();

class AuthController {
    static register(req, res) {
        const { name, email, password } = req.body;

        if (userModel.findByEmail(email)) {
            return res.status(400).json({ message: "User already exists" });
        }

        userModel.create({ name, email, password });
        return res.status(201).json({ message: "Registered successfully" });
    }

    static login(req, res) {
        const { email, password } = req.body;

        if (!userModel.verify(email, password)) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        return res.status(200).json({ message: "Login successful", email });
    }
}

export default AuthController;