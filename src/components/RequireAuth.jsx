import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/" />;
}

export default RequireAuth;
