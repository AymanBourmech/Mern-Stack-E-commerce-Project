import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteArticle } from "../../Features/articleSlice";
import ModalArticle from "../Articles/ModalArticle";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { removeSelectedArticle } from "../../Features/articleSlice";
import { removeSelectedCategorie } from "../../Features/categorieSlice";
import { removeSelectedScategorie } from "../../Features/scategorieSlice";
const AfficheArticles = () => {
  const [open, setOpen] = useState("");
  const [_id, set_id] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { articles, isLoading, error } = useSelector((state) => state.articles);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    set_id("");
    dispatch(removeSelectedArticle());
    dispatch(removeSelectedCategorie());
    dispatch(removeSelectedScategorie());
  };
  const modifArt = (value) => {
    setOpen(true);
    set_id(value);
  };
  const handleDelete = (id) => {
    if (window.confirm("supprimer l'article O/N")) {
      dispatch(deleteArticle(id));
      navigate("/Listarticles");
    }
  };

  const columns = [
    {
      label: "Reference",
      name: "reference",
    },
    {
      label: "Designation",
      name: "designation",
    },
    {
      label: "PrixAchat",
      name: "prixAchat",
    },
    {
      label: "PrixVente",
      name: "prixVente",
    },
    {
      label: "Marque",
      name: "marque",
    },
    {
      label: "Qtestock",
      name: "qtestock",
    },
    {
      label: "Category",
      name: "categorieID",
      options: {
        customBodyRender: (categ) => (categ ? categ.nomcategorie : null),
      },
    },
    {
      label: "Scategory",
      name: "scategorieID",
      options: {
        customBodyRender: (scateg) => (scateg ? scateg.nomscategorie : null),
      },
    },
    {
      label: "Imageartpetitf",
      name: "imageartpetitf",
      options: {
        customBodyRender: (rowdata) => (
          <img
            style={{ height: 50, width: 50, borderRadius: "10%" }}
            src={`data:image/image/png;base64,${rowdata}`}
            alt=""
          />
        ),
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
                modifArt(value);
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
  const renderArticles = () => {
    if (isLoading)
      return (
        <center>
          <ReactLoading type="spokes" color="red" height={"8%"} width={"8%"} />
        </center>
      );
    if (error) return;

    <p>Impossible d'afficher la liste des articles...</p>;

    return (
      <React.Fragment>
        {articles && articles?.length > 0 ? (
          <ThemeProvider theme={createTheme()}>
            <MUIDataTable
              title="List categories"
              data={articles}
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
          <ModalArticle handleClose={handleClose} open={open} _id={_id} />
        )}
      </div>
      <div>
        <div
          style={{
            background: "#303031",
            width: 160,
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
          Nouveau article
        </div>
      </div>
      <div style={{ margin: 10 }}>{renderArticles()}</div>
    </div>
  );
};
export default AfficheArticles;
