import Scategorie from "../models/scategorie.js";
import mongoose from "mongoose";

export const getSCategories = async (req, res) => {
  try {
    const scat = await Scategorie.find().populate("categorieID").exec();
    res.status(200).json(scat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getSCategorieByID = async (req, res) => {
  try {
    const scat = await Scategorie.findById(req.params.id);
    res.status(200).json(scat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSCategorieByCAT = async (req, res) => {
  try {
    var scat = await Scategorie.find({
      categorieID: req.params.categorieID,
    }).exec();
    res.status(200).json(scat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createSCategorie = async (req, res) => {
  const { nomscategorie, imagescat, categorieID } = req.body;
  const newSCategorie = new Scategorie({
    nomscategorie: nomscategorie,
    imagescat: imagescat,
    categorieID: categorieID,
  });
  try {
    await newSCategorie.save();
    res.status(201).json(newSCategorie);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const updateSCategorie = async (req, res) => {
  const { id } = req.params;
  const { nomscategorie, imagescat, categorieID } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`pas de sous categorie avec un id: ${id}`);
  const scat1 = {
    nomscategorie: nomscategorie,
    imagescat: imagescat,
    _id: id,
    categorieID: categorieID,
  };
  await Scategorie.findByIdAndUpdate(id, scat1);
  res.json(scat1);
};
export const deleteSCategorie = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`pas de sous categorie avec l'ID: ${id}`);
  await Scategorie.findByIdAndDelete(id);
  res.json({ message: "sous categorie deleted successfully." });
};
