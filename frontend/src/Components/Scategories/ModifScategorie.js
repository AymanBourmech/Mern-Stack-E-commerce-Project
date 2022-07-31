import React from "react";
import { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import {
  findScategorieByID,
  updateScategorie,
} from "../../Features/scategorieSlice";
import { getCategories } from "../../Features/categorieSlice";
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
const ModifScategorie = (props) => {
  const { categories } = useSelector((state) => state.categories);
  const { scategorie } = useSelector((state) => state.scategories);
  const [open, setOpen] = useState("");
  const { error, success } = useSelector((state) => state.scategories);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [_id, set_id] = useState(props._id);
  const [nomscategorie, setNomScategorie] = useState("");
  const [imagescat, setImageScategorie] = useState("");
  const [categorieID, setCategorieID] = useState("");
  useEffect(() => {
    dispatch(findScategorieByID(_id));
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    set_id(scategorie._id);
    setNomScategorie(scategorie.nomscategorie);
    setImageScategorie(scategorie.imagescat);
    setCategorieID(scategorie.categorieID);
  }, [scategorie]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const scat = {
      _id: _id,
      nomscategorie: nomscategorie,
      imagescat: imagescat,
      categorieID: categorieID,
    };
    dispatch(updateScategorie(scat));
  };

  return (
    <div className="container">
      {success ? (
        <Stack
          sx={{ position: "fixed", top: "55px", width: "90%" }}
          spacing={2}
        >
          <Alert severity="success">Modifié Avec Succès</Alert>
        </Stack>
      ) : null}
      {error ? (
        <Stack
          sx={{ position: "fixed", top: "55px", width: "90%" }}
          spacing={2}
        >
          <Alert severity="error">Erreur : Non Modifié </Alert>
        </Stack>
      ) : null}
      <form>
        <div style={{ position: "fixed", top: "90px" }}>
          <div>Modifier SousCatégorie</div>
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
            <div>
              <label className="form-label">
                <Button
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOpen()}
                >
                  <AddCircleRoundedIcon color="warning" />
                </Button>
                Add Category
              </label>
            </div>
            <div>
              {open && (
                <ModalCategorie
                  handleClose={handleClose}
                  open={open}
                  _id={categorieID._id}
                />
              )}
            </div>

            <Select
              fullWidth
              value={categorieID}
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
            {imagescat ? (
              <img
                src={`data:image/image/png;base64,${imagescat}`}
                alt="scateg"
                width="230"
                height="120"
              />
            ) : null}
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

export default ModifScategorie;
