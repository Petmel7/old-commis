
import api from './api';

export const getFavorites = async () => {
    const response = await api.get('/favorites');
    console.log('getFavorites->response', response);
    return response.data;
};

export const addFavorite = async (productId) => {
    const response = await api.post('/favorites', { productId });
    console.log('addFavorite->response', response);
    return response.data;
};

export const deleteFavorite = async (favoriteId) => {
    const response = await api.delete(`/favorites/${favoriteId}`);
    console.log('deleteFavorite->response', response);
    return response.data;
};
