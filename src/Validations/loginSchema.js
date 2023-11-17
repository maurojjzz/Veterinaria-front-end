import Joi from "joi";

const loginSchema = Joi.object({

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "email debe ser una cadena de texto",
      "string.empty": "Este campo no puede estar vacio",
      "string.email": "Debe ser un email valido",
    }),

  password: Joi.string()
    .min(8)
    .max(25)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .required()
    .messages({
      "string.base": "La contraseña debe ser una cadena de texto",
      "string.empty": "La contraseña es un campo requerido",
      "string.min": "La contraseña debe tener al menos 8 caracteres",
      "string.max": "La contraseña no debe tener más de 25 caracteres",
      "string.pattern.base":
        "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número",
    }),

});

export default loginSchema;
