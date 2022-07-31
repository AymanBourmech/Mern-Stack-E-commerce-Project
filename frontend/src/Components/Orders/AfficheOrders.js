import React, { useState, useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, updateOrder } from "../../Features/orderSlice";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import ListArtOrder from "./ListArtOrder";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const AfficheOrders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const gridRef = useRef();
  const [status, setStatus] = useState();
  const editOrder = (params) => {
    return (
      <select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          dispatch(
            updateOrder({ _id: params.data._id, status: e.target.value })
          );
        }}
      >
        <option>{params.data.status}</option>
        <option>Non traité</option>
        <option>En cours de traitement</option>
        <option>Expédié</option>
        <option>Livré</option>
        <option>Annulé</option>
      </select>
    );
  };
  const deleteOrd = (params) => {
    return (
      <span
        onClick={() => {
          dispatch(deleteOrder(params.data._id));
        }}
        style={{ cursor: "pointer" }}
      >
        <DeleteForeverRoundedIcon color="error" />
      </span>
    );
  };
  const ShowDetail = useCallback((event) => {
    return (
      <span
        onClick={() => {
          handleOpen();
          setParams(event.node.data.allProduct);
        }}
        style={{ cursor: "pointer" }}
      >
        <MoreHorizIcon color="warning" />
      </span>
    );
  }, []);
  const [columnDefsOrder] = useState([
    {
      headerName: "Details",
      cellRenderer: (params) => {
        return ShowDetail(params);
      },
      width: 100,
    },
    {
      headerName: "Client",
      field: "user.nom",
      filter: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
    },
    {
      field: "amount",
      filter: true,
      filter: "agNumberColumnFilter",
      floatingFilter: true,
    },
    {
      field: "status",
      filter: "agTextColumnFilter",
      cellRenderer: (params) => {
        return editOrder(params);
      },
      floatingFilter: true,
    },
    {
      field: "createdAt",
      filter: "agNumberColumnFilter",
      floatingFilter: true,
    },
    {
      field: "updatedAt",
      filter: "agNumberColumnFilter",
      floatingFilter: true,
    },

    {
      headerName: "Delete",
      field: "_id",
      cellRenderer: (params) => {
        return deleteOrd(params);
      },
      width: 100,
    },
  ]);
  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
  }));
  const [open, setOpen] = useState("");
  const [params, setParams] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setParams("");
  };
  return (
    <div>
      <div>
        {open && (
          <ListArtOrder handleClose={handleClose} open={open} params={params} />
        )}
      </div>
      {orders && orders?.length > 0 ? (
        <div
          className="ag-theme-alpine"
          style={{
            position: "fixed",
            top: 200,
            left: 300,
            width: 1270,
            height: 400,
          }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={orders}
            columnDefs={columnDefsOrder}
            defaultColDef={defaultColDef}
            rowSelection={"multiple"}
          />
        </div>
      ) : null}
    </div>
  );
};
export default AfficheOrders;
