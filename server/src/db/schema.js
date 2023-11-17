const Joi = require('@hapi/joi');

// NOTE: This is unfortunately also being maintatined in constants.js (react-client/src/constants/constants.jsx
// If changed, please change there as well
const statusEnum = ['Inquiry', 'Waiting for Patient', 'Action Needed', 'Onboarding', 'Active', 'Churned'];

const addressSchema = Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
  });

const schema = Joi.object({
    firstname: Joi.string()
        .min(1)
        .max(30)
        .required(),
    middlename: Joi.string()
        .min(1)
        .max(30),
    lastname: Joi.string()
        .min(1)
        .max(30)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    dateOfBirth: Joi.date()
        .iso()
        .required(),
    status: Joi.string()
        .valid(...statusEnum)
        .required(),
    addresses: Joi.array()
        .items(addressSchema)
        .required()
})

// Function to dynamically update the schema based on user-defined fields
function updateUserSchema(customFields) {
    const customFieldsSchema = Joi.object().keys(customFields);
    return schema.keys({ customFields: customFieldsSchema });
}

module.exports = {
    updateUserSchema,
    schema, 
    Joi
};