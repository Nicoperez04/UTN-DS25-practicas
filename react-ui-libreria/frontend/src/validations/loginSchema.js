// src/validations/loginSchema.js
// Qué valida y por qué:
// - email: formato válido y requerido 
// - password: mínimo 6 ( solo por poner algo)

import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Formato de email inválido")
    .required("El email es obligatorio"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
});
