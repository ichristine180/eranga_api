import {} from "dotenv/config";
import connect from "./config/database.js";
import express, { json } from "express";
import { createUser, login } from "./controllers/user.js";
import multer from "multer";
import authenticate from "./middleware/auth.js";
import {
  createDoc,
  deleteDoc,
  findByStatus,
  getAllDocument,
  updateDoc,
  viewFounderMobile,
} from "./controllers/fDocument.js";
import { handleUpload } from "./middleware/uploadHandler.js";
import { deleteLostDoc, getAllLostDoc, getPublishedDoc, saveLostDoc, updateLostDoc } from "./controllers/lDocument.js";
const app = express();
app.use(json());
// for uploading document image
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();
router.post("/create", createUser);
router.post("/login", login);
// found document public routes
router.post(
  "/fdoc/create",
  upload.single("doc_image"),
  handleUpload,
  createDoc
);
router.post("/fdoc/viewContact", viewFounderMobile);
router.post("/fdoc/getByStatus", findByStatus);
//lost document public routes
router.post("/ldoc/create", saveLostDoc);
router.post("/ldoc/published", getPublishedDoc);
// found document admin routes
router.get("/fdoc/all", authenticate, getAllDocument);
router.post("/fdoc/update", authenticate, updateDoc);
router.post("/fdoc/reject", authenticate, deleteDoc);

// Lost document admin routes
router.get("/ldoc/all", authenticate, getAllLostDoc);
router.post("/ldoc/update", authenticate, updateLostDoc);
router.post("/ldoc/reject", authenticate, deleteLostDoc);
app.get("/", authenticate, (req, res) => {
  res.status(200).send("Welcome 🙌 to eranga");
});
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use("/api", router);

export default app;
