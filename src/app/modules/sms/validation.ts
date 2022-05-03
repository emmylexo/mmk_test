import Joi from "joi";


export default {
    inbound: {
        body: {
            schema: Joi.object({
                from: Joi.string().min(6).max(16).required()
                    .messages({
                        'any.required': `from is missing`,
                        'string.min': `from is invalid`,
                        'string.max': `from is invalid`
                    }),
                to: Joi.string().min(6).max(16).required()
                    .messages({
                        'any.required': `to is missing`,
                        'string.min': `to is invalid`,
                        'string.max': `to is invalid`
                    }),
                text: Joi.string().min(1).max(120).required()
                    .messages({
                        'any.required': `text is missing`,
                        'string.min': `text is invalid`,
                        'string.max': `text is invalid`
                    }),
            })
        }
    },

    outbound: {
        body: {
            schema: Joi.object({
                from: Joi.string().min(6).max(16).required()
                    .messages({
                        'any.required': `from is missing`,
                        'string.min': `from is invalid`,
                        'string.max': `from is invalid`
                    }),
                to: Joi.string().min(6).max(16).required()
                    .messages({
                        'any.required': `to is missing`,
                        'string.min': `to is invalid`,
                        'string.max': `to is invalid`
                    }),
                text: Joi.string().min(1).max(120).required()
                    .messages({
                        'any.required': `text is missing`,
                        'string.min': `text is invalid`,
                        'string.max': `text is invalid`
                    }),
            })
        }
    }
}