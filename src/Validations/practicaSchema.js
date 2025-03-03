import Joi from "joi";

const practicaSchema = Joi.object({
  descripcion: Joi.string()
    .min(3)
    .max(80)
    .regex(/^[a-zA-Z ]+$/)
    .messages({
      "string.base": "Descripcion debe ser una cadena de texto",
      "string.empty": "Este es un campo requerido",
      "string.min": "Nombre como minimo 3 caracteres",
      "string.max": "Nombre como maximo 25 caracteres",
      "string.pattern.base": "Nombre solo debe contener letras",
    })
    .required(),

  precio: Joi.number().min(0).max(5000000).required().messages({
      "number.base": "El importe debe ser un número",
      "number.min": "El importe debe ser como mínimo 1",
      "number.max": "El importe debe ser como máximo 5 millones",
      "any.required": "Este es un campo requerido",
    }),
});

export default practicaSchema;
