import express from "express";
import DraggedImageRoutes from '../route/DraggedImageRoutes.js'; 

class Server {
    constructor() {
        this.app = express();
        this.configureMiddleware();
        this.setupRoutes();
    }

    configureMiddleware() {
        console.log("Configuring middleware...");
        this.app.use(express.static("../frontend/"));
        // this.app.use(express.json({ limit: "10mb" }));
        this.app.use(express.json( {limit: "100mb"}));
    }
   
    setupRoutes() {
        console.log("Setting up routes...");
        this.app.use("/api", DraggedImageRoutes);
        this.app.use("/api/users", userRoutes);
    }

    start(port = 3000) {
        this.app.listen(port, () => {
            console.log(`Server starting on port ${port}...`);
        })
    }

}

console.log("Starting server...");
const server = new Server();
server.start();