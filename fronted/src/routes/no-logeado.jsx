import { Navigate, Outlet } from "react-router-dom";

export const NoLogeado = ({
  isAllowed,
  children,
  redirectTo = "/iniciar-sesion",
}) => {
  if (!isAllowed) return <Navigate to={redirectTo} />;
  return children ? children : <Outlet />;
};
