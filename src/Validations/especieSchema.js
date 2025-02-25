import Joi from "joi";

const especieSchema = Joi.object({
  descripcion: Joi.string().min(3).max(50).required().messages({
    "string.empty": "La descripción no puede estar vacía",
    "string.min": "La descripción debe tener al menos 3 caracteres",
    "string.max": "La descripción no puede superar los 50 caracteres",
    "any.required": "La descripción es obligatoria",
  }),
});

export default especieSchema; // 👈 Exportación por defecto
