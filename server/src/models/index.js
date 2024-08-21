
// // server/src/models/index.js
// const User = require('./User');
// const Product = require('./Product');
// const Order = require('./Order');
// const OrderItem = require('./OrderItem');
// const RefreshToken = require('./RefreshToken');
// const Favorite = require('./Favorite');

// // Визначення асоціацій
// User.hasMany(Product, { foreignKey: 'user_id' });
// Product.belongsTo(User, { foreignKey: 'user_id', as: 'seller' });

// User.hasMany(Order, { foreignKey: 'user_id' });
// Order.belongsTo(User, { foreignKey: 'user_id', as: 'buyer' });

// Order.hasMany(OrderItem, { foreignKey: 'order_id' });
// OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

// Product.hasMany(OrderItem, { foreignKey: 'product_id' });
// OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

// User.hasMany(RefreshToken, { foreignKey: 'user_id' });
// RefreshToken.belongsTo(User, { foreignKey: 'user_id' });

// User.hasMany(Favorite, { foreignKey: 'user_id' });
// Favorite.belongsTo(User, { foreignKey: 'user_id' });

// Product.hasMany(Favorite, { foreignKey: 'product_id' });
// Favorite.belongsTo(Product, { foreignKey: 'product_id' });

// module.exports = {
//     User,
//     Product,
//     Order,
//     OrderItem,
//     RefreshToken,
//     Favorite
// };




const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const RefreshToken = require('./RefreshToken');
const Favorite = require('./Favorite');
const Payment = require('./Payment');  // Додано Payment

// Визначення асоціацій
User.hasMany(Product, { foreignKey: 'user_id' });
Product.belongsTo(User, { foreignKey: 'user_id', as: 'seller' });

User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'buyer' });

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

User.hasMany(RefreshToken, { foreignKey: 'user_id' });
RefreshToken.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Favorite, { foreignKey: 'user_id' });
Favorite.belongsTo(User, { foreignKey: 'user_id' });

Product.hasMany(Favorite, { foreignKey: 'product_id' });
Favorite.belongsTo(Product, { foreignKey: 'product_id' });

User.hasMany(Payment, { foreignKey: 'user_id' });
Payment.belongsTo(User, { foreignKey: 'user_id' });

Order.hasMany(Payment, { foreignKey: 'order_id' });
Payment.belongsTo(Order, { foreignKey: 'order_id' });

module.exports = {
    User,
    Product,
    Order,
    OrderItem,
    RefreshToken,
    Favorite,
    Payment
};

