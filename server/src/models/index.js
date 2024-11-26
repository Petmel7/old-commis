
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
User.hasMany(Product, { foreignKey: 'user_id', as: 'products', onDelete: 'CASCADE' });
Product.belongsTo(User, { foreignKey: 'user_id', as: 'seller' });

// Зв'язок між User і Order
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'buyer' });

// Зв'язок між Order і OrderItem
Order.hasMany(OrderItem, { foreignKey: 'order_id', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

// Зв'язок між Product і OrderItem
Product.hasMany(OrderItem, { foreignKey: 'product_id', onDelete: 'CASCADE' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

// Зв'язок між User і RefreshToken
User.hasMany(RefreshToken, { foreignKey: 'user_id', onDelete: 'CASCADE' });
RefreshToken.belongsTo(User, { foreignKey: 'user_id' });

// Зв'язок між User і Favorite
User.hasMany(Favorite, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Favorite.belongsTo(User, { foreignKey: 'user_id' });

// Зв'язок між Product і Favorite
Product.hasMany(Favorite, { foreignKey: 'product_id', onDelete: 'CASCADE' });
Favorite.belongsTo(Product, { foreignKey: 'product_id' });

// Зв'язок між User і Payment
User.hasMany(Payment, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Payment.belongsTo(User, { foreignKey: 'user_id' });

// Зв'язок між Order і Payment
Order.hasMany(Payment, { foreignKey: 'order_id', onDelete: 'CASCADE' });
Payment.belongsTo(Order, { foreignKey: 'order_id' });

// Зв'язок між Category і Subcategory
Category.hasMany(Subcategory, { foreignKey: 'category_id', onDelete: 'CASCADE' });
Subcategory.belongsTo(Category, { foreignKey: 'category_id' });

// Зв'язок між Subcategory і Product
Subcategory.hasMany(Product, { foreignKey: 'subcategory_id', onDelete: 'CASCADE' });
Product.belongsTo(Subcategory, { foreignKey: 'subcategory_id' });

// Зв'язок між Product і Size (багато-до-багато)
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



// // Product -> OrderItem
// Product.hasMany(OrderItem, { foreignKey: 'product_id', as: 'productOrders' });
// OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'orderedProduct' });

// // User -> Product
// User.hasMany(Product, { foreignKey: 'user_id', as: 'products' });
// Product.belongsTo(User, { foreignKey: 'user_id', as: 'seller' });

// // User -> Order
// User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
// Order.belongsTo(User, { foreignKey: 'user_id', as: 'buyer' });

// // Order -> OrderItem
// Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'orderItems' });
// OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'parentOrder' });

// // User -> RefreshToken
// User.hasMany(RefreshToken, { foreignKey: 'user_id', as: 'tokens' });
// RefreshToken.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// // User -> Favorite
// User.hasMany(Favorite, { foreignKey: 'user_id', as: 'favorites' });
// Favorite.belongsTo(User, { foreignKey: 'user_id', as: 'userFavorites' });

// // Product -> Favorite
// Product.hasMany(Favorite, { foreignKey: 'product_id', as: 'productFavorites' });
// Favorite.belongsTo(Product, { foreignKey: 'product_id', as: 'favoriteProducts' });

// // User -> Payment
// User.hasMany(Payment, { foreignKey: 'user_id', as: 'payments' });
// Payment.belongsTo(User, { foreignKey: 'user_id', as: 'paymentUser' });

// // Order -> Payment
// Order.hasMany(Payment, { foreignKey: 'order_id', as: 'orderPayments' });
// Payment.belongsTo(Order, { foreignKey: 'order_id', as: 'paymentOrder' });

// // Category -> Subcategory
// Category.hasMany(Subcategory, { foreignKey: 'category_id', as: 'subcategories' });
// Subcategory.belongsTo(Category, { foreignKey: 'category_id', as: 'parentCategory' });

// // Subcategory -> Product
// Subcategory.hasMany(Product, { foreignKey: 'subcategory_id', as: 'subcategoryProducts' });
// Product.belongsTo(Subcategory, { foreignKey: 'subcategory_id', as: 'subcategory' });

// // Product -> Size (Many-to-Many)
// Product.belongsToMany(Size, {
//     through: 'product_sizes',
//     foreignKey: 'product_id',
//     timestamps: false,
//     as: 'availableSizes'
// });

// Size.belongsToMany(Product, {
//     through: 'product_sizes',
//     foreignKey: 'size_id',
//     timestamps: false,
//     as: 'productsWithSize'
// });
