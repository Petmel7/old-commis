
import { getFavorites } from '@/services/favorites';

export const fetchFavorites = async () => {
    try {
        const response = await getFavorites();
        console.log('///fetchFavorites->response', response);
        return response;
    } catch (error) {
        console.error('Помилка при завантаженні вибраних товарів:', error);
        return [];
    }
};
