/* eslint-disable react/prop-types */
// AdminRoutes.js
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoutes = ({ children }) => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const isAdmin = parsedUser && parsedUser?.role === "admin";

 

  if (!isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  // return
  // If admin, render the requested admin route component
  return <>{children}</>;
};

export default AdminRoutes;
