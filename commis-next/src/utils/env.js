const isProduction = import.meta.env.MODE === 'production' || process.env.NODE_ENV === 'production';

const getServerUrl = () =>
    isProduction
        ? import.meta.env.VITE_SERVER_PROD_URL || process.env.SERVER_PROD_URL
        : import.meta.env.VITE_SERVER_DEV_URL || process.env.SERVER_DEV_URL;

const getClientUrl = () =>
    isProduction
        ? import.meta.env.VITE_CLIENT_PROD_URL || process.env.CLIENT_PROD_URL
        : import.meta.env.VITE_CLIENT_DEV_URL || process.env.CLIENT_DEV_URL;

export { isProduction, getServerUrl, getClientUrl };
