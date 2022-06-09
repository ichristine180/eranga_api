import {} from "dotenv/config";
import connect from "./config/database.js";
import express, { json } from "express";
import { createUser, login } from "./controllers/user.js";
import authenticate from "./middleware/auth.js";
import {
  createDoc,
  deleteDoc,
  findByStatus,
  getAllDocument,
  updateDoc,
  viewFounderMobile,
} from "./controllers/fDocument.js";
const app = express();

app.use(json());
const router = express.Router();
router.post("/create", createUser);
router.post("/login", login);
// found document public routes 
router.post("/fdoc/create", createDoc);
router.post("/fdoc/viewContact", viewFounderMobile);
router.get("/fdoc/getByStatus", findByStatus);
// found document admin routes 
router.get("/fdoc/all",authenticate, getAllDocument);
router.post("/fdoc/update", authenticate, updateDoc);
router.post("/fdoc/close", authenticate, deleteDoc);
app.get("/", authenticate, (req, res) => {
  res.status(200).send("Welcome 🙌 to eranga");
});
app.use("/api", router);

export default app;
