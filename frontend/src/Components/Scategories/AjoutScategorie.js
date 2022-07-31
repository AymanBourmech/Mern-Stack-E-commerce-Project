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
import { createScategorie } from "../../Features/scategorieSlice";
import { getCategories } from "../../Features/categorieSlice";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ModalCategorie from "../Categories/ModalCategorie";

const useStyles = makeStyles({
  formControl: {
    margin: "20px",
    minWidth: 120,
  },
});
const styles = {
  backgroundColor: "green",
  height: "40px",
  width: "520px",
  borderRadius: "15px",
  position: "fixed",
  top: "555px",
};
const AjoutScategorie = () => {
  const [nomscategorie, setNomScategorie] = useState("");
  const [imagescat, setImageScategorie] = useState("");
  const [open, setOpen] = useState("");
  const [categorieID, setCategorieID] = useState("");
  const { categories } = useSelector((state) => state.categories);
  const { error, success } = useSelector((state) => state.scategories);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const scat = {
      nomscategorie: nomscategorie,
      imagescat: imagescat,
      categorieID: categorieID,
    };
    dispatch(createScategorie(scat));
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
        <div style={{ position: "fixed", top: "90px" }}>
          <div>Ajouter SousCatégorie</div>
          <div className="mb-3">
            <FormControl className={classes.formControl}>
              <TextField
                variant="outlined"
                label="Scategory Name"
                value={nomscategorie}
                onChange={(e) => setNomScategorie(e.target.value)}
                required
              />
            </FormControl>
          </div>
          <div className={classes.formControl}>
            <div>
              <label className="form-label">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOpen()}
                >
                  <AddCircleRoundedIcon color="warning" />
                </span>
                Add Category
              </label>
            </div>
            <div>
              {open && <ModalCategorie handleClose={handleClose} open={open} />}
            </div>

            <Select
              fullWidth
              Value={categorieID}
              onChange={(e) => setCategorieID(e.target.value)}
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
          </div>

          <div className={classes.formControl}>
            <div>
              <label className="form-label"> Image </label>
            </div>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                let b = base64.split("base64,")[1];
                setImageScategorie(b);
              }}
            />
          </div>
          <div className={classes.formControl}>
            <center>
              {imagescat ? (
                <img
                  src={`data:image/image/png;base64,${imagescat}`}
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
