import Categorie from "../models/categorie.js";
import mongoose from "mongoose";
export const getCategories = async (req, res) => {
  try {
    const cat = await Categorie.find();
    res.status(200).json(cat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getCategorieByID = async (req, res) => {
  try {
    const cat = await Categorie.findById(req.params.id);
    res.status(200).json(cat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createCategorie = async (req, res) => {
  const newCategorie = new Categorie(req.body);
  try {
    await newCategorie.save();
    res.status(201).json(newCategorie);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateCategorie = async (req, res) => {
  const { id } = req.params;

  const { nomcategorie, imagecategorie } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`pas de categorie avec un id: ${id}`);

  const cat1 = {
    nomcategorie: nomcategorie,
    imagecategorie: imagecategorie,
    _id: id,
  };

  await Categorie.findByIdAndUpdate(req.params.id, cat1);

  res.json(cat1);
};

export const deleteCategorie = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`pas de categorie avec l'ID: ${id}`);
  await Categorie.findByIdAndDelete(id);
  res.json({ message: "categorie deleted successfully." });
};
