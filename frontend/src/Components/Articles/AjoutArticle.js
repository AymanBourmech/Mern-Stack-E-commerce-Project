import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createArticle } from "../../Features/articleSlice";
import { getCategories } from "../../Features/categorieSlice";
import { getScategories } from "../../Features/scategorieSlice";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ModalCategorie from "../Categories/ModalCategorie";
import ModalScategorie from "../Scategories/ModalScategorie";
import { findScategorieByCat } from "../../Features/scategorieSlice";

const useStyles = makeStyles({
  formControl: {
    margin: "10px",
    minWidth: 120,
  },
});
const styles = {
  backgroundColor: "green",
  height: "40px",
  width: "520px",
  borderRadius: "15px",
  position: "fixed",
  top: "680px",
};
const AjoutScategorie = () => {
  const [reference, setReference] = useState("");
  const [designation, setDesignation] = useState("");
  const [prixAchat, setPrixAchat] = useState("");
  const [prixVente, setPrixVente] = useState("");
  const [marque, setMarque] = useState("");
  const [qtestock, setQtestock] = useState("");
  const [imageartpetitf, setImageartpetitf] = useState("");
  const [categorieID, setCategorieID] = useState("");
  const [scategorieID, setScategorieID] = useState("");
  const [open, setOpen] = useState("");
  const [typemodal, setTypemodal] = React.useState("");
  const { categories } = useSelector((state) => state.categories);
  const { scategories } = useSelector((state) => state.scategories);
  const { error, success } = useSelector((state) => state.articles);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getScategories());
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
  };
  const AfficheModalCateg = () => {
    setTypemodal("categorie");
    setOpen(true);
  };

  const AfficheModalSCateg = () => {
    setTypemodal("scategorie");
    setOpen(true);
  };

  const GetListScategories = (cat) => {
    dispatch(findScategorieByCat(cat));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const art = {
      reference: reference,
      designation: designation,
      prixAchat: prixAchat,
      prixVente: prixVente,
      marque: marque,
      qtestock: qtestock,
      imageartpetitf: imageartpetitf,
      categorieID: categorieID,
      scategorieID: scategorieID,
    };
    dispatch(createArticle(art));
  };

  return (
    <div className="container">
      {success ? (
        <Stack
          sx={{ position: "fixed", top: "55px", width: "90%" }}
          spacing={2}
        >
          <Alert severity="success">Ajouté Avec Succès</Alert>
        </Stack>
      ) : null}
      {error ? (
        <Stack
          sx={{ position: "fixed", top: "55px", width: "90%" }}
          spacing={2}
        >
          <Alert severity="error">Erreur : Non Ajouté</Alert>
        </Stack>
      ) : null}
      <form>
        <div style={{ position: "fixed", top: "105px" }}>
          <div>Ajouter Article</div>
          <div className="mb-2">
            <FormControl className={classes.formControl}>
              <TextField
                variant="outlined"
                label="Reference"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                required
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                variant="outlined"
                label="Designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                required
              />
            </FormControl>
          </div>

          <div className="mb-2">
            <FormControl className={classes.formControl}>
              <TextField
                variant="outlined"
                label="PrixAchat"
                value={prixAchat}
                onChange={(e) => setPrixAchat(e.target.value)}
                required
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                variant="outlined"
                label="PrixVente"
                value={prixVente}
                onChange={(e) => setPrixVente(e.target.value)}
                required
              />
            </FormControl>
          </div>

          <div className="mb-2">
            <FormControl className={classes.formControl}>
              <TextField
                variant="outlined"
                label="Marque"
                value={marque}
                onChange={(e) => setMarque(e.target.value)}
                required
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                variant="outlined"
                label="Qtestock"
                value={qtestock}
                onChange={(e) => setQtestock(e.target.value)}
                required
              />
            </FormControl>
          </div>

          <FormControl style={{ width: "260px" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => AfficheModalCateg()}
            >
              <AddCircleRoundedIcon color="warning" />
            </span>
            Catégories
            <div>
              {open && typemodal === "categorie" ? (
                <ModalCategorie handleClose={handleClose} open={open} />
              ) : null}
            </div>
          </FormControl>

          <FormControl style={{ width: "260px" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => AfficheModalSCateg()}
            >
              <AddCircleRoundedIcon color="warning" />
            </span>
            S/Catégories
            <div>
              {open && typemodal === "scategorie" ? (
                <ModalScategorie handleClose={handleClose} open={open} />
              ) : null}
            </div>
          </FormControl>

          <FormControl style={{ width: "255px" }}>
            <Select
              style={{ width: "235px" }}
              value={categorieID}
              onChange={(e) => {
                setCategorieID(e.target.value);
                GetListScategories(e.target.value);
              }}
            >
              {categories
                ? categories.map((c) => (
                    <MenuItem value={c._id} key={c._id}>
                      <img
                        src={`data:image/image/png;base64,${c.imagecategorie}`}
                        alt="categ"
                        width="50"
                        height="30"
                      />
                      {c.nomcategorie}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>

          <FormControl style={{ width: "255px" }}>
            <Select
              style={{ width: "225px" }}
              value={scategorieID}
              onChange={(e) => setScategorieID(e.target.value)}
            >
              {scategories
                ? scategories.map((c) => (
                    <MenuItem value={c._id} key={c._id}>
                      <img
                        src={`data:image/image/png;base64,${c.imagescat}`}
                        alt="scateg"
                        width="50"
                        height="30"
                      />
                      {c.nomscategorie}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>

          <div className={classes.formControl}>
            <div>
              <label className="form-label"> Image </label>
            </div>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                let b = base64.split("base64,")[1];
                setImageartpetitf(b);
              }}
            />
          </div>
          <div className={classes.formControl}>
            <center>
              {imageartpetitf ? (
                <img
                  src={`data:image/image/png;base64,${imageartpetitf}`}
                  alt="scateg"
                  width="230"
                  height="140"
                />
              ) : null}
            </center>
          </div>
        </div>
        <div>
          <Button
            variant="contained"
            sx={styles}
            onClick={(event) => handleSubmit(event)}
          >
            Sauvegarder
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AjoutScategorie;
