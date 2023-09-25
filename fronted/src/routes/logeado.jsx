import { Navigate, Outlet } from "react-router-dom";

export const Logeado = ({ isAllowed, children, redirectTo = "/" }) => {
  if (!isAllowed) return <Navigate to={redirectTo} />;
  return children ? children : <Outlet />;
};
