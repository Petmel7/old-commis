// server/src/controllers/favoriteController.js

const { Favorite, Product } = require('../models');

const addFavorite = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    try {
        const created = await Favorite.findOrCreate({
            where: { user_id: userId, product_id: productId },
        });

        if (!created) {
            return res.status(409).json({ message: 'The product has already been added to your favorites' });
        }

        res.status(201).json({ message: 'Product added to favorites' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteFavorite = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Favorite.findByPk(id);
        if (!result) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (result.user_id !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this product' });
        }
        await result.destroy();
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.findAll({
            where: { user_id: req.user.id },
            include: [
                {
                    model: Product,
                    as: 'Product',
                    attributes: ['id', 'name', 'description', 'price', 'stock', 'images', 'user_id'] // Вкажіть поля, які хочете повернути
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
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    addFavorite,
    deleteFavorite,
    getFavorites
}
