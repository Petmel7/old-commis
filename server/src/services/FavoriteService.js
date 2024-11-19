const { Favorite, Product } = require('../models');
const { checkAuthorization } = require('../utils/authUtils');
const { validateFavoriteData } = require('../validators/validators');

const addFavorite = async (productId, req) => {
    const userId = checkAuthorization(req);

    validateFavoriteData(productId);

    const [favorite, created] = await Favorite.findOrCreate({
        where: { user_id: userId, product_id: productId },
    });

    if (!created) {
        throw { status: 409, message: 'The product has already been added to your favorites' };
    }
};

const deleteFavorite = async (id, req) => {
    const userId = checkAuthorization(req);

    const favorite = await Favorite.findByPk(id);
    if (!favorite) {
        return createResponse(res, 404, 'Product not found', 'not_found');
    }
    if (favorite.user_id !== userId) {
        throw { status: 403, message: 'Not authorized to delete this product' };
    }

    await favorite.destroy();
};

const getFavorites = async (req) => {
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

    return response;
}

module.exports = {
    addFavorite,
    deleteFavorite,
    getFavorites
}