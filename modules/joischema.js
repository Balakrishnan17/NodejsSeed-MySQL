const Joi = require('joi');

class JoiSchema {

    constructor() {}

    loginSchema() {
        return Joi.object().keys({
            // username is required
            // username must be a valid email string
            username: Joi.string().email().required(),

            //password is required
            //password must be a alphanumeric string
            password: Joi.string().regex(/^[a-z0-9]+$/i).required(),
        });
    }

    singInSchema() {
        return Joi.object().keys({
            // username is required
            // username must be a valid email string
            email: Joi.string().email().required(),
            
            first_name:Joi.string().regex(/^[a-z]+$/i).required(),
            
            last_name: Joi.string().allow('').regex(/^[a-z]+$/i),
            
            phone_number:Joi.string().regex(/^[0-9]+$/i).required(),
            
            //password is required
            //password must be a alphanumeric string
            password: Joi.string().regex(/^[a-z0-9]+$/i).required(),

            date_of_birth:Joi.string().regex(/^\d{2}-\d{2}-\d{4}$/i).required()
        });
    }
}

module.exports = JoiSchema