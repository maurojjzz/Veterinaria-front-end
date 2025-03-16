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

  mascota: Joi.alternatives()
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
});

export default AtencionSchema;
