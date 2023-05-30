import Joi from "joi";

const validator = (schema) => {
  return (payload) => schema.validate(payload, { abortEarly: false });
};

const registerSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().required().email(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9*@#]+$"))
    .min(6)
    .max(1024)
    .required(),
  role: Joi.string().valid('teacher', 'student').required(),
  birthDate: Joi.date().iso().required(),
  phoneNumber: Joi.string().pattern(/^(?:\+961|0)(?:3|7|71|76|78|79|81|81|83|84|70|81)\d{6}$/).required(),
});

export const validateRegister = validator(registerSchema);
