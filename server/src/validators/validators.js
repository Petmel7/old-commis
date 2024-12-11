const Joi = require('joi');

const productSchema = Joi.object({
    id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().integer().required(),
    images: Joi.array().items(Joi.string()).required(),
    subcategory_id: Joi.number().integer().required(),
    is_active: Joi.boolean().default(true)
});

const addFavoriteSchema = Joi.object({
    productId: Joi.number().integer().required().messages({
        'number.base': '"productId" must be a number',
        'any.required': '"productId" mandatory to fill'
    })
});

const validateProduct = (product) => {
    const { error, value } = productSchema.validate(product.dataValues || product);
    if (error) {
        throw new Error(`Validation error: ${error.details[0].message}`);
    }
    return value;
};

const validateFavoriteData = (productId) => {
    const { error } = addFavoriteSchema.validate({ productId });
    if (error) {
        throw { status: 400, message: error.details[0].message, type: 'validation_error' };
    }
};

module.exports = {
    productSchema,
    addFavoriteSchema,
    validateProduct,
    validateFavoriteData
};
