import Joi from "joi";

const mascotaSchema = Joi.object({
  nombre: Joi.string()
    .min(1)
    .max(30)
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ0-9 ]*$/)
    .messages({
      "string.base": "Nombre debe ser una cadena de texto",
      "string.empty": "Este es un campo requerido",
      "string.max": "Nombre como maximo 30 caracteres",
      "string.pattern.base": "Nombre solo debe contener letras",
    })
    .required(),

  sexo: Joi.string()
    .min(4)
    .max(30)
    .regex(/^[a-zA-Z ]+$/)
    .messages({
      "string.base": "Nombre debe ser una cadena de texto",
      "string.empty": "Este es un campo requerido",
      "string.max": "Nombre como maximo 30 caracteres",
      "string.pattern.base": "Nombre solo debe contener letras",
    })
    .required(),

  fecha_nacimiento: Joi.date().required().messages({
    "date.base": "La fecha de atención debe ser una fecha válida",
    "any.required": "Este es un campo requerido",
  }),

  owner: Joi.string()
    .messages({
      "string.base": "Nombre debe ser una cadena de texto",
      "string.empty": "Este es un campo requerido",
    })
    .required(),

  raza: Joi.alternatives().try(
    Joi.object({
      id: Joi.string().required(),
      descripcion: Joi.string().required(),
    }).required(),
    Joi.string().required()
  ),
});


export default mascotaSchema;
