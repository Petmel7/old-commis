
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const cron = require('node-cron');
const session = require('express-session');
const passport = require('./config/passport');
const sequelize = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const catalogRoutes = require('./routes/catalogRoutes');
const sizeRoutes = require('./routes/sizeRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { errorHandler } = require('./middleware/errorHandler');
const { deleteOldRefreshTokens } = require('./controllers/userController');
const checkInactiveSellers = require('./tasks/checkInactiveSellers');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_session_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/products', productRoutes);
app.use('/api/products', sizeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/catalog', catalogRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the eCommerce API');
});

app.use(errorHandler);

cron.schedule('0 0 * * *', async () => {
    await deleteOldRefreshTokens();
    console.log('Scheduled task executed: old refresh tokens deleted');
});

cron.schedule('0 2 * * *', () => {
    console.log('Running daily inactive sellers check...');
    checkInactiveSellers();
});

sequelize.sync().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
