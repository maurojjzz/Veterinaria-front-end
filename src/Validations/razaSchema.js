import Joi from "joi";

const razaSchema = Joi.object({
  descripcion: Joi.string()
    .min(3)
    .max(80)
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ0-9 ]*$/)
    .messages({
      "string.base": "Descripcion debe ser una cadena de texto",
      "string.empty": "Este es un campo requerido",
      "string.min": "Nombre como minimo 3 caracteres",
      "string.max": "Nombre como maximo 25 caracteres",
      "string.pattern.base": "Nombre solo debe contener letras",
    })
   .required(),

   especie: Joi.alternatives().try(
       Joi.object({
         id: Joi.string().required(),
         descripcion: Joi.string().required(),
       }).required(),
       Joi.string().required()
     ),
});

export default razaSchema;
