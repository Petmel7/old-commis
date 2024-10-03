const Joi = require('joi');

// Схема для валідації продуктів
const productSchema = Joi.object({
    id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().integer().required(),
    images: Joi.array().items(Joi.string()).required(),
    subcategory_id: Joi.number().integer().required() // Заміна category на subcategory_id
});

// Схема для валідації додавання до улюблених
const addFavoriteSchema = Joi.object({
    productId: Joi.number().integer().required().messages({
        'number.base': '"productId" повинно бути числом',
        'any.required': '"productId" обов’язкове для заповнення'
    })
});

module.exports = { productSchema, addFavoriteSchema };
