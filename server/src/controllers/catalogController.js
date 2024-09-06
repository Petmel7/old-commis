const Product = require('../models/Product')

const getProductsByCategory = async (req, res) => {
    const { category } = req.query;

    console.log('@@@CATEGORY', category);

    try {
        const products = await Product.findAll({
            where: { category },
        });
        console.log('$$$PRODUCTS', products);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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

module.exports = {
    getProductsByCategory,
    getCategoryList
}