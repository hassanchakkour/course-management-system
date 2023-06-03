import Joi from "joi";

const validator = (schema) => {
  return (payload) => schema.validate(payload, { abortEarly: false });
};

const registerSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().required().email(),
  //The password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@, *, or #)
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@*#])[a-zA-Z0-9*@#]+$"
      )
    )
    .min(6)
    .max(1024)
    .required(),
  role: Joi.string().valid("teacher", "student").required(),
  birthDate: Joi.date().iso().required(),
  phoneNumber: Joi.string()
    .pattern(/^(?:(?:\+|00)961)?\d{8}$/)
    .required(),
  gender: Joi.string().valid("male", "female").required(),
  specialization: Joi.when("role", {
    is: "teacher",
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
});

export const validateRegister = validator(registerSchema);
