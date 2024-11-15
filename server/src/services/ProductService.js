// const { Product } = require('../models');

// const getProductById = async (id) => {
//     const product = await Product.findByPk(id);

//     if (!product) {
//         throw { status: 404, message: 'Продукт не знайдено' };
//     }

//     return product;
// };

// const checkOwnershipOrAdmin = async (user, productId) => {
//     const product = await getProductById(productId);

//     if (user.role !== 'superadmin' && product.user_id !== user.id) {
//         throw { status: 403, message: 'Ви не маєте права змінювати цей продукт' };
//     }

//     return product;
// };

// const updateProduct = async (id, updateData) => {
//     const product = await getProductById(id);
//     await product.update(updateData);

//     return product;
// };

// module.exports = {
//     getProductById,
//     checkOwnershipOrAdmin,
//     updateProduct,
// };

const { Product, Subcategory, User } = require('../models');

const getProductById = async (id) => {
    const product = await Product.findByPk(id);

    if (!product) {
        throw { status: 404, message: 'Продукт не знайдено' };
    }

    return product;
};

const updateProduct = async (id, updateData) => {
    const product = await getProductById(id);
    await product.update(updateData);

    return product;
};

const findProductById = async (id) => {
    const product = await Product.findByPk(id);
    if (!product) {
        throw { status: 404, message: 'Продукт не знайдено' };
    }
    return product;
};

// const checkOwnershipOrAdmin = async (user, product) => {
//     if (user.role !== 'superadmin' && product.user_id !== user.id) {
//         throw { status: 403, message: 'Ви не можете редагувати цей продукт' };
//     }
// };

const checkOwnershipOrAdmin = async (user, productId) => {
    const product = await Product.findByPk(productId);
    console.log('Перевірка прав доступу:', { userId: user.id, role: user.role, product });

    if (!product) {
        throw { status: 404, message: 'Продукт не знайдено' };
    }

    if (user.role !== 'superadmin' && product.user_id !== user.id) {
        throw { status: 403, message: 'Ви не можете редагувати цей продукт' };
    }

    return product;
};

const deleteProduct = async (product) => {
    const subcategoryId = product.subcategory_id;
    await product.destroy();

    const remainingProducts = await Product.count({ where: { subcategory_id: subcategoryId } });
    if (remainingProducts === 0) {
        await Subcategory.destroy({ where: { id: subcategoryId } });
    }
};

const updateUserRoleIfNoProducts = async (userId) => {
    const remainingUserProducts = await Product.count({ where: { user_id: userId } });
    if (remainingUserProducts === 0) {
        await User.update({ role: 'buyer' }, { where: { id: userId } });
    }
};

module.exports = {
    getProductById,
    updateProduct,
    findProductById,
    checkOwnershipOrAdmin,
    deleteProduct,
    updateUserRoleIfNoProducts,
};

