
const CatalogService = require('../services/CatalogService');

const getProductsByCategory = async (req, res, next) => {
    const { category } = req.query;

    try {
        const products = await CatalogService.getProductsByCategory(category);

        if (!products || products.length === 0) {
            return res.status(200).json({ status: 'success', data: [], message: 'No products found for this category' });
        }

        res.status(200).json({ status: 'success', data: products });
    } catch (error) {
        next(error);
    }
};

const fetchSubcategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const subcategory = await CatalogService.getSubcategoryById(id);

        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        res.json(subcategory);
    } catch (error) {
        console.error('Error in fetchSubcategoryById:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const fetchCategoryBySubcategoryId = async (req, res) => {
    try {
        const { subcategoryId } = req.params;
        const category = await CatalogService.getCategoryBySubcategoryId(subcategoryId);

        if (!category) {
            return res.status(404).json({ message: 'Category not found for subcategory' });
        }

        res.json(category);
    } catch (error) {
        console.error('Error in fetchCategoryBySubcategoryId:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getProductsByCategory,
    fetchSubcategoryById,
    fetchCategoryBySubcategoryId
};
