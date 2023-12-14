import Joi from "joi";

const AtencionSchema = Joi.object({
  fecha: Joi.date().required().messages({
    "date.base": "La fecha de atención debe ser una fecha válida",
    "any.required": "Este es un campo requerido",
  }),

  hora: Joi.string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
    .required()
    .messages({
      "string.pattern.base": "La hora de atención debe tener un formato válido (HH:mm)",
      "any.required": "Este es un campo requerido",
    }),

  forma_de_pago: Joi.string().required().messages({
    "string.pattern.base": "La forma de pago debe ser un string",
    "any.required": "Este es un campo requerido",
  }),

  importe: Joi.number().min(1).max(5000000).required().messages({
    "number.base": "El importe debe ser un número",
    "number.min": "El importe debe ser como mínimo 1",
    "number.max": "El importe debe ser como máximo 5 millones",
    "any.required": "Este es un campo requerido",
  }),
  pagos: Joi.alternatives()
    .try(
      Joi.array().items(Joi.string()).messages({
        "array.base": 'El campo "pagos" debe ser un arreglo',
        "array.includes": 'El arreglo "pagos" debe contener elementos válidos',
      }),
      Joi.string()
    )
    .optional()
    .messages({
      "any.required": "Este es un campo requerido",
    }),
  mascotas: Joi.alternatives()
    .try(
      Joi.array()
        .items(
          Joi.object({
            id: Joi.string().required(),
            nombre: Joi.string().required(),
            sexo: Joi.string().required(),
            fecha_nacimiento: Joi.date(),
            owner: Joi.string().required(),
            raza: Joi.string().required(),
          })
        )
        .messages({
          "array.base": 'El campo "mascotas" debe ser un arreglo',
          "array.includes": 'El arreglo "mascotas" debe contener elementos válidos',
        }),
      Joi.string()
    )
    .messages({
      "any.required": "Este es un campo requerido",
    }),
  practicas: Joi.array().items(Joi.string()).min(1).required().messages({
    "any.required": "Este es un campo requerido",
    "array.base": 'El campo "practicas" debe ser un arreglo',
    "array.includes": 'El arreglo "practicas" debe contener elementos válidos',
    "array.min": 'El arreglo "practicas" debe contener al menos un elemento',
    "string.base": 'Los elementos del arreglo "practicas" deben ser cadenas de texto',
    "string.empty": 'Los elementos del arreglo "practicas" no pueden estar vacíos',
  }),

  veterinario: Joi.alternatives()
    .try(
      Joi.object({
        apellido: Joi.string().required(),
        email: Joi.string()
          .email({ tlds: { allow: false } })
          .required(),
        id: Joi.string().required(),
        matricula: Joi.string().required(),
        nombre: Joi.string().required(),
        nro_doc: Joi.string().required(),
        password: Joi.string().required(),
        rol: Joi.string().required(),
        telefono: Joi.string().required(),
      }),
      Joi.string()
    )
    .messages({
      "any.required": "Este es un campo requerido",
    }),
  cliente: Joi.string()
    .messages({
      "string.base": "Nombre debe ser una cadena de texto",
      "string.empty": "Este es un campo requerido",
    })
    .required(),
});

export default AtencionSchema;
