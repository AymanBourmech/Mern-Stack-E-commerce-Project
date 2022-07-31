import React, { useState } from "react";
import { removeSelectedScategorie } from "../../Features/scategorieSlice";
import { removeSelectedCategorie } from "../../Features/categorieSlice";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteScategorie } from "../../Features/scategorieSlice";
import ModalScategorie from "../Scategories/ModalScategorie";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { getScategories } from "../../Features/scategorieSlice";

const AfficheScategories = () => {
  const [open, setOpen] = useState("");
  const [_id, set_id] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { scategories, isLoading, error } = useSelector(
    (state) => state.scategories
  );
  useEffect(() => {
    dispatch(getScategories());
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    set_id("");
    dispatch(removeSelectedScategorie());
    dispatch(removeSelectedCategorie());
  };
  const modifScateg = (value) => {
    setOpen(true);
    set_id(value);
  };
  const handleDelete = (id) => {
    if (window.confirm("supprimer la catégorie O/N")) {
      dispatch(deleteScategorie(id));
      navigate("/Listscategories");
    }
  };
  const columns = [
    {
      label: "Name",
      name: "nomscategorie",
    },
    {
      label: "Image",
      name: "imagescat",
      options: {
        customBodyRender: (rowdata) => (
          <img
            style={{ height: 190, width: 300, borderRadius: "10%" }}
            src={`data:image/image/png;base64,${rowdata}`}
            alt=""
          />
        ),
      },
    },

    {
      label: "Category",
      name: "categorieID",
      options: {
        customBodyRender: (categ) => (categ ? categ.nomcategorie : null),
      },
    },

    {
      name: "_id",
      label: "Actions",
      options: {
        customBodyRender: (value) => (
          <div>
            <span
              onClick={() => {
                modifScateg(value);
              }}
              style={{ cursor: "pointer" }}
            >
              <NoteAltOutlinedIcon color="success" />
            </span>
            <span
              onClick={(e) => handleDelete(value)}
              style={{ cursor: "pointer" }}
            >
              <DeleteForeverRoundedIcon color="error" />
            </span>
          </div>
        ),
      },
    },
  ];
  const renderScategories = () => {
    if (isLoading)
      return (
        <center>
          <ReactLoading type="spokes" color="red" height={"8%"} width={"8%"} />
        </center>
      );
    if (error) return;

    <p>Impossible d'afficher la liste des sous-catégories...</p>;
    return (
      <React.Fragment>
        {scategories ? (
          <ThemeProvider theme={createTheme()}>
            <MUIDataTable
              title="List Scategories"
              data={scategories}
              columns={columns}
              options={{
                rowsPerPageOptions: [5, 10, 15, 100],
              }}
            />
          </ThemeProvider>
        ) : null}
      </React.Fragment>
    );
  };
  return (
    <div style={{ position: "absolute", top: 90, left: 250, width: "75%" }}>
      <div>
        {open && (
          <ModalScategorie handleClose={handleClose} open={open} _id={_id} />
        )}
      </div>
      <div>
        <div
          style={{
            background: "#303031",
            width: 180,
            height: 30,
            color: "white",
            borderRadius: 20,
            cursor: "pointer",
            margin: 5,
            padding: 5,
            fontFamily: "arial",
          }}
          onClick={handleOpen}
        >
          <AddCircleRoundedIcon style={{ fontSize: "20px" }} />
          Nouvelle Scatégorie
        </div>
      </div>
      <div style={{ margin: 10 }}>{renderScategories()}</div>
    </div>
  );
};

export default AfficheScategories;
