import * as Yup from "yup";
export const LoginSchema = Yup.object().shape({
  usuario: Yup.string().required("El usuario es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
});
