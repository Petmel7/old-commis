
import api from './api';

export const getFavorites = async () => {
    const response = await api.get('/favorites');
    return response.data;
};

export const addFavorite = async (productId) => {
    const response = await api.post('/favorites', { productId });
    return response.data;
};

export const deleteFavorite = async (favoriteId) => {
    const response = await api.delete(`/favorites/${favoriteId}`);
    return response.data;
};
