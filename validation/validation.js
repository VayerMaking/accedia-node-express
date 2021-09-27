const Joi = require("joi");

const validation = Joi.array().items(
  Joi.object({
    Username: Joi.string().required(),
    Indentifier: Joi.number().required(),
    FirstName: Joi.string().required(),
    LastName: Joi.string().required(),
  })
);

const uploadValidation = async (schema) => {
  return validation.validate(schema);
};
module.exports = uploadValidation;
