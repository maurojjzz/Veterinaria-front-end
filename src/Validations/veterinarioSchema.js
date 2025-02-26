import Joi from 'joi';

const veterinarioSchema = Joi.object({
  matricula: Joi.string()
    .required()
    .length(8)
    .regex(/^[A-Z0-9 ]+$/)
    .messages({
      "string.base": "Matrícula debe ser una cadena de texto",
      "string.empty": "Este es un campo requerido",
      "string.length": "La matrícula debe tener exactamente 8 caracteres",
      "string.pattern.base": "La matrícula solo debe contener números y letras mayusculas",
    }),

    nombre: Joi.string()
    .min(3)
    .max(25)
    .regex(/^[a-zA-Z ]+$/)
    .messages({
      "string.base": "Nombre debe ser una cadena de texto",
      "string.empty": "Este es un campo requerido",
      "string.min": "Nombre como minimo 3 caracteres",
      "string.max": "Nombre como maximo 25 caracteres",
      "string.pattern.base": "Nombre solo debe contener letras",
    })
    .required(),

    apellido: Joi.string()
    .min(3)
    .max(25)
    .regex(/^[a-zA-Z ]+$/)
    .messages({
      "string.base": "Apellido debe ser una cadena de texto",
      "string.empty": "Este es un campo requerido",
      "string.min": "Apellido como minimo 3 caracteres",
      "string.max": "Apellido como maximo 25 caracteres",
      "string.pattern.base": "Apellido solo debe contener letras",
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

    email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "email debe ser una cadena de texto",
      "string.empty": "Este campo no puede estar vacio",
      "string.email": "Debe ser un email valido",
    }),

    nro_doc: Joi.string()
    .pattern(/^[0-9]{7,8}$/)
    .required()
    .messages({
      "string.base": "El DNI debe ser una cadena de texto",
      "string.empty": "Este es un campo requerido",
      "string.pattern.base": "El DNI debe contener entre 7 y 8 dígitos numéricos",
    }),

    password: Joi.string()
    .min(8)
    .max(25)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .messages({
      "string.base": "La contraseña debe ser una cadena de texto",
      "string.empty": "La contraseña es un campo requerido",
      "string.min": "La contraseña debe tener al menos {#limit} caracteres",
      "string.max": "La contraseña no debe tener más de {#limit} caracteres",
      "string.pattern.base":
      "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número",
    }),
  repeatPassword: Joi.string().valid(Joi.ref("password")).messages({
    "string.base": "La contraseña debe ser una cadena de texto",
    "string.empty": "La contraseña es un campo requerido",
    "any.only": "Las contraseñas no son iguales"
  }),
  rol: Joi.alternatives().try(
    Joi.object({
      id: Joi.string().required(),
      descripcion: Joi.string().required(),
    }).required(),
    Joi.string().required()
  ),
});

export default veterinarioSchema;
