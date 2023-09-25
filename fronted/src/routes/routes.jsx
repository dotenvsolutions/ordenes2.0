import Auth from "../pages/auth-page";
import HomePage from "../pages/home-page";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { NoLogeado } from "./no-logeado";
import { Logeado } from "./logeado";
import { useAuthStore } from "../store/auth";
import Navbar from "../layouts/navbar";
import ListUser from "../pages/user/list-user";

export const Router = () => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <Routes>
      <Route element={<Logeado isAllowed={!isAuth} />}>
        <Route path="/iniciar-sesion" element={<Auth />} />
      </Route>

      <Route element={<NoLogeado isAllowed={isAuth} />}>
        <Route element={<Navbar />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/usuarios" element={<ListUser />} />
        </Route>
      </Route>
    </Routes>
  );
};
