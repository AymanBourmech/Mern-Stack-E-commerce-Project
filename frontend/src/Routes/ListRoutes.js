import React from "react";
import { Route, Routes } from "react-router-dom";
import Listarticles from "../Components/Articles/Listarticles";
import Listcategories from "../Components/Categories/Listcategories";
import Listscategories from "../Components/Scategories/Listscategories";
import ListOrders from "../Components/Orders/ListOrders";
import DashboardAdmin from "../Components/Admin/DashboardAdmin";
import Register from "../Components/Admin/Register";
import Cart from "../Components/Client/Cart";
import LoginAccount from "../Components/Client/LoginAccount";
import LogoutAccount from "../Components/Client/LogoutAccount";
import RegisterAccount from "../Components/Client/RegisterAccount";
import CheckoutSuccess from "../Components/Client/CheckoutSuccess";
import StripePayment from "../Components/Client/StripePayment";
import PdfCart from "../Components/Client/PdfCart";
import Card from "../Components/Client/Card";
import Login from "../Components/Admin/Login";
import Logout from "../Components/Admin/Logout";
import ProtectedRoutes from "../Components/Admin/ProtectedRoutes";

const ListRoutes = () => {
  return (
    <div>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
          <Route path="/Listcategories" element={<Listcategories />} />
          <Route path="/Listscategories" element={<Listscategories />} />
          <Route path="/Listarticles" element={<Listarticles />} />
          <Route path="/ListOrders" element={<ListOrders />} />
        </Route>
        <Route path="/Cart" element={<Cart />} />
        <Route path="/LoginAccount" element={<LoginAccount />} />
        <Route path="/LogoutAccount" element={<LogoutAccount />} />
        <Route path="/RegisterAccount" element={<RegisterAccount />} />
        <Route path="/StripePayment/:total" element={<StripePayment />} />
        <Route path="/CheckoutSuccess" element={<CheckoutSuccess />} />
        <Route path="/Pdfcart" element={<PdfCart />} />
        <Route path="/" element={<Card />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Logout" element={<Logout />} />
      </Routes>
    </div>
  );
};

export default ListRoutes;
