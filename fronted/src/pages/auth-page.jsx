import { GeneralInputText, InputPassword } from "../components/inputs";
import { useFormik } from "formik";
import { LoginSchema } from "../schemas/login-schema";
import { VerificarUsuario } from "../services/auth";

import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";

import SliderImage from "../assets/images/slider1.webp";
import { useState } from "react";

const Auth = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const [loading, setLoading] = useState(false);
  /*   const setProfile = useAuthStore((state) => state.setProfile);
   */ const navigate = useNavigate();

  const { values, setFieldValue, errors, handleSubmit } = useFormik({
    initialValues: {
      usuario: "",
      password: "",
      step: 1,
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setLoading(true);
      setToken("token");
      /* setProfile({
        nombre: "Jorge",
        apellidos: "Gonzalez",
        usuario: "jorge.gonzalez",
        rol: "Administrador",
      }); */
      setLoading(false);
      navigate("/");
    },
    initialErrors: {
      usuario: "El usuario es requerido",
    },
  });

  const handleVerification = (e) => {
    e.preventDefault();
    setLoading(true);
    if (values.step === 1 && values.usuario) {
      VerificarUsuario(values.usuario)
        .then((res) => {
          setLoading(false);
          if (res) {
            setFieldValue("step", 2);
          } else {
            alert("El usuario no existe");
          }
        })
        .catch((err) => {
          setLoading(false);
          alert("El usuario no existe");
        });
    }
  };

  const handleGoBack = () => {
    setFieldValue("step", 1);
    setTimeout(() => {
      setFieldValue("password", "");
    }, 1000);
  };

  return (
    <div className="flex items-center justify-between h-screen w-full">
      <div className="h-full flex items-center">
        <div className="md:w-1/2 w-full absolute top-0 left-0 h-full bg-white flex items-center justify-center px-3">
          <form
            className="flex flex-col max-w-xs w-full gap-4"
            onSubmit={handleVerification}
          >
            <h1 className="text-3xl font-bold text-center">
              Por favor, inicia sesión
            </h1>
            <div className="w-full">
              <label htmlFor="nombres" className="font-bold">
                Nombres
              </label>
              <GeneralInputText
                id="nombres"
                value={values.nombre}
                onChange={(e) => setFieldValue("usuario", e.target.value)}
                required
                error={errors.usuario}
                submitted={loading || errors.usuario}
              />
            </div>
            <button
              className={`bg-primary w-full max-w-xs py-2 rounded font-bold text-white ${
                (errors.usuario || loading) && "opacity-50 cursor-not-allowed"
              }`}
              disabled={errors.usuario}
            >
              {loading ? "Cargando..." : "Continuar"}
            </button>
          </form>
        </div>

        <div
          className={`md:w-1/2 w-full absolute top-0 right-0 h-screen bg-white transition-all duration-700 ease-in-out flex flex-col items-center justify-center px-3 z-0 ${
            values.step === 2 ? "left-0" : "left-full"
          }`}
        >
          <form
            className="max-w-xs w-full flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <button
              className="absolute top-2 left-2 font-bold"
              onClick={handleGoBack}
              type="button"
            >
              Regresar
            </button>

            <div className="w-full">
              <label htmlFor="password" className="font-bold">
                Contraseña
              </label>
              <InputPassword
                id="password"
                value={values.password}
                onChange={(e) => setFieldValue("password", e.target.value)}
                required
                error={errors.password}
                submitted={loading || errors.password}
              />
            </div>

            <button
              className={`bg-primary w-full max-w-xs py-2 rounded font-bold text-white ${
                (errors.usuario || loading) && "opacity-50 cursor-not-allowed"
              }`}
              disabled={errors.password}
              type="submit"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>

      <div className="bg-red-100 h-screen z-50 w-1/2 hidden md:block">
        <img src={SliderImage} className="h-full object-cover" />
      </div>
    </div>
  );
};

export default Auth;
