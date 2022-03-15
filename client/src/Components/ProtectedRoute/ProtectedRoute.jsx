import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";

/**
 * protection from unauthorized access
 * @component
 * @param Protected route
 * @returns {JSX.Element}
 */

const ProtectedRoute = () => {
  const { loggedInUser } = useContext(AuthContext);

  return loggedInUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
