
const isProduction = process.env.NODE_ENV === 'production';

const getClientUrl = () =>
    isProduction
        ? process.env.CLIENT_PROD_URL
        : process.env.CLIENT_DEV_URL;

module.exports = {
    isProduction,
    getClientUrl,
};
