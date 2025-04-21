import express from "express";
import FileDragAndDropRoutes from '../routes/file-drag-and-drop-routes.js'; 

class Server {
    constructor() {
        this.app = express();
        this.configureMiddleware();
        this.setupRoutes();
    }

    configureMiddleware() {
        console.log("Configuring middleware...");
        this.app.use(express.static("../frontend/"));
        this.app.use(express.json());
    }
   
    setupRoutes() {
        console.log("Setting up routes...");
        this.app.use("/v1", FileDragAndDropRoutes);
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