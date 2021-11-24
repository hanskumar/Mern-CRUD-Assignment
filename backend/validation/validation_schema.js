    const Joi = require('joi');

    const createUserSchema = Joi.object({ 
        name: Joi.string()
            //.alphanum()
            .max(30)
            .required()
        .messages({
            'string.empty': `name cannot be an empty field`,
        }),
        email: Joi.string().max(30).required()
        .messages({
            'string.empty': `email cannot be an empty field`,
            'string.max': `email can be more than length of {#limit}`,
        }),

        phone: Joi.string().min(10).max(10).required()
        .messages({
            'string.empty': `phone cannot be an empty field`,
            'string.min': `phone should have a minimum length of {#limit}`,
        }), 
        address:Joi.string()
            //.alphanum()
            .max(100)
            .required()
        .messages({
            'string.empty': `name cannot be an empty field`,
        })
    })
  
    module.exports = {
        createUserSchema
    }


    