import Joi from "joi";

const passwordSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .max(25)
    .required()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .messages({
      "string.base": "La contraseña debe ser una cadena de texto",
      "string.empty": "La contraseña es un campo requerido",
      "string.min": "La contraseña debe tener al menos {#limit} caracteres",
      "string.max": "La contraseña no debe tener más de {#limit} caracteres",
      "string.pattern.base":
        "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número",
    }),
  repeatPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "string.base": "La contraseña debe ser una cadena de texto",
    "string.empty": "La contraseña es un campo requerido",
    "any.only": "Las contraseñas no coinciden",
  }),
});

export default passwordSchema;
