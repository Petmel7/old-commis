const Product = require('../models/Product')

const getProductsByCategory = async (req, res) => {
    const { category } = req.query;

    try {
        const products = await Product.findAll({
            where: { category },
        });
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




// const Product = require('../models/Product');
// const { createResponse } = require('../utils/response');

// // Отримання продуктів за категорією
// const getProductsByCategory = async (req, res, next) => {
//     const { category } = req.query;

//     try {
//         const products = await Product.findAll({ where: { category } });
//         createResponse(res, 200, products);
//     } catch (error) {
//         next(error); // передати помилку в middleware для обробки
//     }
// };

// // Отримання списку категорій
// const getCategoryList = async (req, res, next) => {
//     try {
//         const categories = await Product.findAll({
//             attributes: ['category'],
//             group: ['category'],
//             order: [['category', 'ASC']]
//         });
//         createResponse(res, 200, categories.map(cat => cat.category));
//     } catch (error) {
//         next(error); // передати помилку в middleware для обробки
//     }
// };

// module.exports = {
//     getProductsByCategory,
//     getCategoryList,
// };