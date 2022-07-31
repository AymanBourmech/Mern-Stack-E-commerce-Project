import mongoose from "mongoose";
const categorieSchema = mongoose.Schema({
  nomcategorie: { type: String },
  imagecategorie: { type: String },
});
const Categorie = mongoose.model("Categorie", categorieSchema);
export default Categorie;
