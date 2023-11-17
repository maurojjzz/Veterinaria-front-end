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
   .required()
});

export default practicaSchema;
