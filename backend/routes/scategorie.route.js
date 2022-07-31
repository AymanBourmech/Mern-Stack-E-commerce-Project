import express from "express";
import {
  getSCategories,
  getSCategorieByID,
  getSCategorieByCAT,
  createSCategorie,
  deleteSCategorie,
  updateSCategorie,
} from "../controllers/scategories.controllers.js";
const router = express.Router();
router.get("/", getSCategories);
router.get("/:id", getSCategorieByID);
router.get("/cat/:categorieID", getSCategorieByCAT);

router.post("/", createSCategorie);
router.put("/:id", updateSCategorie);
router.delete("/:id", deleteSCategorie);
export default router;
