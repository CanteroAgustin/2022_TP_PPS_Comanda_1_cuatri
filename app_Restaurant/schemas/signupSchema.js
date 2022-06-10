import * as yup from "yup";

export const signupValidationSchema = yup.object().shape({
  name: yup.string().required("🚨 El Nombre es requerido"),
  lastName: yup.string().required("🚨 El Apellido es requerido"),
  dni: yup.number().required("🚨 El Dni es requerido"),
  cuil: yup.number().required("🚨 El Cuil es requerido"),
  email: yup
    .string()
    .email("🚨 Ingrese un email valido")
    .required("🚨 El email es requerido"),
  password: yup
    .string()
    .min(6, ({ min }) => `🚨 El password debe tener al menos ${min} caracteres`)
    .required("🚨 El password es requerido"),
});
