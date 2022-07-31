import React, { useContext, useEffect, useReducer } from "react";
import Chart from "react-google-charts";
import axios from "axios";
import "../../App.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function DashboardAdmin() {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3001/api/admin/summary",
          {
            // headers: { Authorization: Bearer ${userInfo.token} },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: err,
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ position: "absolute", top: 90, left: 300, width: "75%" }}>
      {loading ? (
        <div style={{ marginTop: "70px", color: "red", fontSize: "25px" }}>
          <strong>En attente de commandes.....</strong>
        </div>
      ) : error ? (
        <div variant="danger">{error}</div>
      ) : (
        <>
          <div className="my-3">
            <h2 className="styleTitleDashboard">
              Classification des categories commandées par % :{" "}
            </h2>
            {summary.productCategories.length === 0 ? (
              <div>No Category</div>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ["Category", "Products"],
                  ...summary.productCategories.map((x) => [x._id, x.count]),
                ]}
              ></Chart>
            )}
          </div>
          <div className="my-3">
            <h2 className="styleTitleDashboard">
              Courbe des Ventes en fonction du date
            </h2>
            {summary.dailyOrders.length === 0 ? (
              <div>Pas de vente</div>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="AreaChart"
                loader={<div>Aucours de chargement...</div>}
                data={[
                  ["Date", "Ventes"],
                  ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                ]}
              ></Chart>
            )}
          </div>
          <h2 className="styleTitleDashboard">Autres Statistiques</h2>
          <div className="centerDashbord">
            <ul>
              <li>
                Nombre d'utilisateurs (Client & Admin) :
                {summary.users && summary.users[0]
                  ? summary.users[0].numUsers
                  : 0}
              </li>
              <li>
                {" "}
                Nombre d'achats effectués :
                {summary.orders && summary.users[0]
                  ? summary.orders[0].numOrders
                  : 0}
              </li>
              <li>
                Montant total des commandes clients : $
                {summary.orders && summary.users[0]
                  ? summary.orders[0].totalSales.toFixed(2)
                  : 0}
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
