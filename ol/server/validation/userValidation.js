const Joi = require('joi');

const ValidationUser = (user) => {
    const schema = Joi.object({
        username: Joi.string().max(30).min(4).required(),
        password: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string(),
        dateOfBirth: Joi.string(),
        address: Joi.string()
    });
    return schema.validate(user);
}

module.exports = ValidationUser;