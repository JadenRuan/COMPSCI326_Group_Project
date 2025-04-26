import express from "express";
import DraggedImageRoutes from '../route/DraggedImageRoutes.js';
import WishlistRoutes from '../route/WishlistRoutes.js'; 

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
        this.app.use(express.json( {limit: "100mb", strict: false}));
    }
   
    setupRoutes() {
        console.log("Setting up routes...");
        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods", "*");
            next();
        })
        this.app.use("/api", DraggedImageRoutes);
        this.app.use("/api", WishlistRoutes);
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
console.log("Server is running after starting...");

