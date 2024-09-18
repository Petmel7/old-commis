const Joi = require('joi');

// Схема для валідації додавання до улюблених
const addFavoriteSchema = Joi.object({
    productId: Joi.number().integer().required().messages({
        'number.base': '"productId" повинно бути числом',
        'any.required': '"productId" обов’язкове для заповнення'
    })
});

module.exports = { addFavoriteSchema };
