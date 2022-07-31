import React from "react";
import { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { useDispatch, useSelector } from "react-redux";
import {
  findCategorieByID,
  updateCategorie,
} from "../../Features/categorieSlice";

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
  top: "480px",
};
const Modifcategorie = (props) => {
  const { categorie } = useSelector((state) => state.categories);
  const { error, success } = useSelector((state) => state.categories);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [_id, set_id] = useState(props._id);
  const [nomcategorie, setNomcategorie] = useState("");
  const [imagecategorie, setImagecategorie] = useState("");

  useEffect(() => {
    dispatch(findCategorieByID(_id));
  }, [dispatch]);

  useEffect(() => {
    set_id(categorie._id);
    setNomcategorie(categorie.nomcategorie);
    setImagecategorie(categorie.imagecategorie);
  }, [categorie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const catObject = {
      _id: _id,
      nomcategorie: nomcategorie,
      imagecategorie: imagecategorie,
    };
    dispatch(updateCategorie(catObject));
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
        <div style={{ position: "fixed", top: "115px" }}>
          <div>Modifier Catégorie</div>
          <div className="mb-3">
            <FormControl className={classes.formControl}>
              <TextField
                variant="outlined"
                label="Category Name"
                value={nomcategorie}
                onChange={(e) => setNomcategorie(e.target.value)}
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
                setImagecategorie(b);
              }}
            />
          </div>
          <div className={classes.formControl}>
            {imagecategorie ? (
              <img
                src={`data:image/image/png;base64,${imagecategorie}`}
                alt="categ"
                width="230"
                height="100"
              />
            ) : null}
          </div>
        </div>
        <div>
          <Button
            variant="contained"
            sx={styles}
            onClick={(event) => handleSubmit(event) && props.handleClose(event)}
          >
            Sauvegarder
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Modifcategorie;
