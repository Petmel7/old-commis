
const { Favorite, Product } = require('../models');
const { createResponse } = require('../utils/response');
const { addFavoriteSchema } = require('../validators/validators');

const checkAuthorization = (req) => {
    const userId = req.user ? req.user.id : null;
    if (!userId) {
        throw { status: 401, message: 'Not authorized', type: 'auth_error' };
    }
    return userId;
};

const validateFavoriteData = (productId) => {
    const { error } = addFavoriteSchema.validate({ productId });
    if (error) {
        throw { status: 400, message: error.details[0].message, type: 'validation_error' };
    }
};

const addFavorite = async (req, res, next) => {
    try {
        const userId = checkAuthorization(req);
        const { productId } = req.body;

        validateFavoriteData(productId);

        const [favorite, created] = await Favorite.findOrCreate({
            where: { user_id: userId, product_id: productId },
        });

        if (!created) {
            return createResponse(res, 409, 'The product has already been added to your favorites', 'conflict');
        }

        createResponse(res, 201, 'Product added to favorites', 'success');
    } catch (error) {
        next(error);
    }
};

const deleteFavorite = async (req, res, next) => {
    try {
        const userId = checkAuthorization(req);
        const { id } = req.params;

        const favorite = await Favorite.findByPk(id);
        if (!favorite) {
            return createResponse(res, 404, 'Product not found', 'not_found');
        }
        if (favorite.user_id !== userId) {
            return createResponse(res, 403, 'Not authorized to delete this product', 'auth_error');
        }

        await favorite.destroy();
        createResponse(res, 200, 'Product deleted successfully', 'success');
    } catch (error) {
        next(error);
    }
};

const getFavorites = async (req, res, next) => {
    try {
        const userId = checkAuthorization(req);

        const favorites = await Favorite.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Product,
                    as: 'Product',
                    attributes: ['id', 'name', 'description', 'price', 'stock', 'images', 'user_id']
                }
            ]
        });

        const response = favorites.map(favorite => ({
            id: favorite.id,
            product_id: favorite.product_id,
            product: favorite.Product
        }));

        res.json(response);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addFavorite,
    deleteFavorite,
    getFavorites
}