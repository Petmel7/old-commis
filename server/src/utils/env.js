
const isProduction = process.env.NODE_ENV === 'production';

const getServerUrl = () =>
    isProduction
        ? process.env.SERVER_PROD_URL
        : process.env.SERVER_DEV_URL;

const getClientUrl = () =>
    isProduction
        ? process.env.CLIENT_PROD_URL
        : process.env.CLIENT_DEV_URL;

const getGoogleCallbackUrl = () => {
    isProduction
        ? process.env.GOOGLE_CALLBACK_PROD_URL
        : process.env.GOOGLE_CALLBACK_DEV_URL;
}

module.exports = {
    isProduction,
    getServerUrl,
    getClientUrl,
    getGoogleCallbackUrl
};
