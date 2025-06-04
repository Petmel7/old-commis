
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const RefreshToken = require('./RefreshToken');
const Favorite = require('./Favorite');
const Payment = require('./Payment');
const Category = require('./Category');
const Subcategory = require('./Subcategory');
const Size = require('./Size');

User.hasMany(Product, {
    foreignKey: 'user_id',
    as: 'products',
    onDelete: 'CASCADE'
});
Product.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'seller'
});

User.hasMany(Order, {
    foreignKey: 'user_id',
    as: 'orders',
    onDelete: 'CASCADE'
});
Order.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'buyer'
});

Order.hasMany(OrderItem, {
    foreignKey: 'order_id',
    onDelete: 'CASCADE'
});
OrderItem.belongsTo(Order, {
    foreignKey: 'order_id'
});

Product.hasMany(OrderItem, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE'
});
OrderItem.belongsTo(Product, {
    foreignKey: 'product_id'
});

User.hasMany(RefreshToken, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
RefreshToken.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Favorite, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
Favorite.belongsTo(User, {
    foreignKey: 'user_id'
});

Product.hasMany(Favorite, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE'
});
Favorite.belongsTo(Product, {
    foreignKey: 'product_id'
});

User.hasMany(Payment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
Payment.belongsTo(User, {
    foreignKey: 'user_id'
});

Order.hasMany(Payment, {
    foreignKey: 'order_id',
    onDelete: 'CASCADE'
});
Payment.belongsTo(Order, {
    foreignKey: 'order_id'
});

Category.hasMany(Subcategory, {
    foreignKey: 'category_id',
    as: 'subcategories',
    onDelete: 'CASCADE'
});

Subcategory.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category' // ✅ Додаємо `as` щоб include працював
});

Subcategory.hasMany(Product, {
    foreignKey: 'subcategory_id',
    as: 'products',
    onDelete: 'CASCADE'
});

Product.belongsTo(Subcategory, {
    foreignKey: 'subcategory_id',
    as: 'subcategory'
});

Product.belongsToMany(Size, {
    through: 'product_sizes',
    foreignKey: 'product_id',
    timestamps: false
});

Size.belongsToMany(Product, {
    through: 'product_sizes',
    foreignKey: 'size_id',
    timestamps: false
});

module.exports = {
    User,
    Product,
    Order,
    OrderItem,
    RefreshToken,
    Favorite,
    Payment,
    Category,
    Subcategory,
    Size
};
