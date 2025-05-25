const isProduction = process.env.NODE_ENV === 'production';

const getServerUrl = () =>
    isProduction
        ? process.env.NEXT_PUBLIC_SERVER_PROD_URL
        : process.env.NEXT_PUBLIC_SERVER_DEV_URL;
const getClientUrl = () =>
    isProduction
        ? process.env.NEXT_PUBLIC_CLIENT_PROD_URL
        : process.env.NEXT_PUBLIC_CLIENT_DEV_URL;

export {
    isProduction,
    getServerUrl,
    getClientUrl,
};

