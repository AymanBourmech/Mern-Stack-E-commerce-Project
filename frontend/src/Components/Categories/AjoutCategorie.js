import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createCategorie } from "../../Features/categorieSlice";

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

const AjoutCategorie = (props) => {
  const [nomcategorie, setNomcategorie] = useState("");
  const [imagecategorie, setImagecategorie] = useState("");
  const { error, success } = useSelector((state) => state.categories);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const cat = {
      nomcategorie: nomcategorie,
      imagecategorie: imagecategorie,
    };
    dispatch(createCategorie(cat));
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
        <div style={{ position: "fixed", top: "115px" }}>
          <div>Ajouter Catégorie</div>
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
            <center>
              {imagecategorie ? (
                <img
                  src={`data:image/image/png;base64,${imagecategorie}`}
                  alt="categ"
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
export default AjoutCategorie;
