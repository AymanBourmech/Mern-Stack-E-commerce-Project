import express from "express";
import {
  createUser,
  getuserBYEmailUser,
  getusers,
  getuserBYEmailClient,
} from "../controllers/users.controllers.js";
const router = express.Router();
router.get("/", getusers);
router.post("/loginclient", getuserBYEmailClient);
router.post("/", createUser);
router.post("/login", getuserBYEmailUser);

export default router;
