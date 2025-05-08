import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import DraggedImageRoutes from "../route/DraggedImageRoutes.js";
import AuthRoutes from "../route/AuthRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Server {
  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.setupRoutes();
  }

  configureMiddleware() {
    console.log("Configuring middleware...");
    this.app.use(express.static(path.join(__dirname, "../../frontend/src")));
    this.app.use(express.json({ limit: "100mb", strict: false }));
  }
  
  setupRoutes() {
    console.log("Setting up routes...");
  
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "*");
      next();
    });
  
    this.app.get("/signup", (req, res) => {
      res.sendFile(path.join(__dirname, "../../frontend/src/signup.html"));
    });
    this.app.get("/login", (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/src/login.html"));
      });
  
      this.app.get("/home", (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/index.html"));
      });
  
    this.app.use("/api", DraggedImageRoutes);
    this.app.use("/api", AuthRoutes);
  
    this.app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/index.html"));
      });
  }
  

  start(port = 3001) {
    this.app.listen(port, () => {
      console.log(`Server starting on port ${port}...`);
    });
  }
}

console.log("Starting server...");
const server = new Server();
server.start();
console.log("Server is running after starting...");
