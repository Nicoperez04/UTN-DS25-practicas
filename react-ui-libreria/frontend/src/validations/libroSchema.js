// src/validations/libroSchema.js
// Qué valida y por qué:
// - titulo / autor: obligatorios y con mínimo 
// - descripcion: opcional, pero limitada para que no escriba un testamento
// - portada: opcional; si se sube, controlo tipo y tamaño

import * as yup from "yup";

const MB = 1024 * 1024;
const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];

export const libroSchema = yup.object({
  titulo: yup
    .string()
    .trim()
    .min(2, "El título debe tener al menos 2 caracteres")
    .required("El título es obligatorio"),
  autor: yup
    .string()
    .trim()
    .min(2, "El autor debe tener al menos 2 caracteres")
    .required("El autor es obligatorio"),
  descripcion: yup
    .string()
    .trim()
    .max(500, "La descripción no debe superar 500 caracteres")
    .optional(),
  portada: yup
    .mixed()
    .test(
      "fileType",
      "La imagen debe ser JPEG, PNG o WebP",
      (file) => !file || (file && tiposPermitidos.includes(file.type))
    )
    .test(
      "fileSize",
      "La imagen no debe superar 2 MB",
      (file) => !file || (file && file.size <= 2 * MB)
    )
    .nullable()
    .optional(),
});
