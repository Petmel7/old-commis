
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

// Зв'язок між User і Product
User.hasMany(Product, { foreignKey: 'user_id' });
Product.belongsTo(User, { foreignKey: 'user_id', as: 'seller' });

// Зв'язок між User і Order
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'buyer' });

// Зв'язок між Order і OrderItem
Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

// Зв'язок між Product і OrderItem
Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

// Зв'язок між User і RefreshToken
User.hasMany(RefreshToken, { foreignKey: 'user_id' });
RefreshToken.belongsTo(User, { foreignKey: 'user_id' });

// Зв'язок між User і Favorite
User.hasMany(Favorite, { foreignKey: 'user_id' });
Favorite.belongsTo(User, { foreignKey: 'user_id' });

// Зв'язок між Product і Favorite
Product.hasMany(Favorite, { foreignKey: 'product_id' });
Favorite.belongsTo(Product, { foreignKey: 'product_id' });

// Зв'язок між User і Payment
User.hasMany(Payment, { foreignKey: 'user_id' });
Payment.belongsTo(User, { foreignKey: 'user_id' });

// Зв'язок між Order і Payment
Order.hasMany(Payment, { foreignKey: 'order_id' });
Payment.belongsTo(Order, { foreignKey: 'order_id' });

// Зв'язок між Category і Subcategory
Category.hasMany(Subcategory, { foreignKey: 'category_id' });
Subcategory.belongsTo(Category, { foreignKey: 'category_id' });

// Зв'язок між Subcategory і Product
Subcategory.hasMany(Product, { foreignKey: 'subcategory_id' });
Product.belongsTo(Subcategory, { foreignKey: 'subcategory_id' });

// Створення зв'язку між продуктами та розмірами
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


