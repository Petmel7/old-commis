
// const { Sequelize } = require('sequelize');
// const dotenv = require('dotenv');
// const path = require('path');

// dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000,
//     },
// });

// // const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
// //     host: process.env.DB_HOST,
// //     dialect: 'postgres',
// //     dialectOptions: {
// //         ssl: {
// //             require: true,
// //             rejectUnauthorized: false, // ← критично для Supabase
// //         }
// //     },
// //     pool: {
// //         max: 5,
// //         min: 0,
// //         acquire: 30000,
// //         idle: 10000,
// //     },
// // });

// sequelize.authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

// module.exports = sequelize;





const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');

// Завантаження .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Умова для перевірки середовища
const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        ...(isProduction && {
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false, // Для Supabase
                },
            },
        }),
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;

