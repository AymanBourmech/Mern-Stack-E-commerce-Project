import express from "express";
import {
  getCategories,
  getCategorieByID,
  createCategorie,
  deleteCategorie,
  updateCategorie,
} from "../controllers/categories.controllers.js";
const router = express.Router();
router.get("/", getCategories);
router.get("/:id", getCategorieByID);
router.post("/", createCategorie);
router.put("/:id", updateCategorie);
router.delete("/:id", deleteCategorie);

export default router;
