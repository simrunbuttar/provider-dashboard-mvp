const Joi = require('joi');

const schema = Joi.object({
    firstname: Joi.string()
        .min(2)
        .max(30)
        .required(),
    lastname: Joi.string()
        .min(2)
        .max(30)
        .required(),
})

module.exports = schema;
