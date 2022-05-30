import {} from "dotenv/config";
import connect from "./config/database.js";
import express, { json } from "express";
import { createUser, login } from "./controllers/user.js";
const app = express();

app.use(json());
const router = express.Router();
router.post("/create", createUser);
router.post("/login",login)

app.use("/api",router);

export default app;
