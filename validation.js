const Joi = require('joi');

const validation = Joi.array().items(
    Joi.object({
        Username: Joi.string().required(),
        Identifier: Joi.number().required(),
        FirstName: Joi.string().required(),
        LastName: Joi.string().required()

    }));

const dataValidation = async (schema) => {
    const { error } = validation.validate(schema);
    if (error) {
        console.log(error.message);
    }
};
module.exports = dataValidation;