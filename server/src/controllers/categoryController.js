// server/src/controllers/categoryController.js

const Product = require('../models/Product');

const getCategoryList = async (req, res) => {
    try {
        const categories = await Product.findAll({
            attributes: ['category'],
            group: ['category'],
            order: [['category', 'ASC']]
        });

        res.status(200).json(categories.map(cat => cat.category));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCategoryList };
