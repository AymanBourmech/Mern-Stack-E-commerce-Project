import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const ProtectedRoutes = () => {
  let token = localStorage.getItem("CC_Token");

  return token != null ? (
    <>
      <AdminSidebar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/Login" />
  );
};

export default ProtectedRoutes;
