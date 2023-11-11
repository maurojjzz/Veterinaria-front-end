import Joi from 'joi';

const veterinarioSchema = Joi.object({
  matricula: Joi.string()
    .required()
    .messages({
      "string.base": "Matrícula debe ser una cadena de texto",
      "string.empty": "Este es un campo requerido",
    }),

  apellido: Joi.string()
    .min(3)
    .max(25)
    .regex(/^[a-zA-Z ]+$/)
    .messages({
      "string.base": "Apellido debe ser una cadena de texto",
      "string.empty": "Este es un campo requerido",
      "string.min": "Apellido como mínimo 3 caracteres",
      "string.max": "Apellido como máximo 25 caracteres",
      "string.pattern.base": "Apellido solo debe contener letras",
    })
    .required(),

  nombre: Joi.string()
    .min(3)
    .max(25)
    .regex(/^[a-zA-Z ]+$/)
    .messages({
      "string.base": "Nombre debe ser una cadena de texto",
      "string.empty": "Este es un campo requerido",
      "string.min": "Nombre como mínimo 3 caracteres",
      "string.max": "Nombre como máximo 25 caracteres",
      "string.pattern.base": "Nombre solo debe contener letras",
    })
    .required(),

  telefono: Joi.string()
    .pattern(/^\+?[0-9]{9,15}$/)
    .required()
    .messages({
      "string.base": "El número de teléfono debe ser una cadena de texto",
      "string.empty": "Este es un campo requerido",
      "string.pattern.base": "El número de teléfono debe contener entre 9 y 15 dígitos numéricos",
    }),

  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.base": "Email debe ser una cadena de texto",
    "string.empty": "Este es un campo requerido",
    "string.email": "Debe ser un email válido",
  }),

  password: Joi.string()
    .min(8)
    .max(25)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .required()
    .messages({
      "string.base": "La contraseña debe ser una cadena de texto",
      "string.empty": "Este es un campo requerido",
      "string.min": "La contraseña debe tener al menos {#limit} caracteres",
      "string.max": "La contraseña no debe tener más de {#limit} caracteres",
      "string.pattern.base":
        "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número",
    }),

  // Otros campos según tus necesidades para los veterinarios
});

export default veterinarioSchema;
