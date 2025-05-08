import modelFactory from "../model/ModelFactory.js";

class AuthController {
    constructor() {
        this.model = modelFactory.getUserModel(); // Default model (probably JSON)

        // Asynchronously upgrade to SQLite (or another DB)
        this.getModelPromise = modelFactory.getModel("sqlite", "forUser").then((model) => {
            this.model = model;
        });
    }

    async register(req, res) {
        await this.getModelPromise; // Wait for model to be ready

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing name, email, or password" });
        }

        try {
            const existingUser = await this.model.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            await this.model.create({ name, email, password });
            return res.status(201).json({ message: "Registered successfully" });

        } catch (error) {
            console.error("Error in register:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async login(req, res) {
        await this.getModelPromise; // Wait for model to be ready

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Missing email or password" });
        }

        try {
            const isValid = await this.model.verify(email, password);
            if (!isValid) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            return res.status(200).json({ message: "Login successful", email });

        } catch (error) {
            console.error("Error in login:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default AuthController;