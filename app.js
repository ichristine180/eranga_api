import {} from "dotenv/config";
import connect from "./config/database.js";
import express, { json } from "express";
import { createUser, login } from "./controllers/user.js";
import authenticate from "./middleware/auth.js";
const app = express();

app.use(json());
const router = express.Router();
router.post("/create", createUser);
router.post("/login", login);
app.get("/", authenticate, (req, res) => {
  res.status(200).send("Welcome 🙌 to eranga");
});
app.use("/api", router);

export default app;
