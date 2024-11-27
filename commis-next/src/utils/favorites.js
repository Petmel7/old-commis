
export const isProductFavorite = (productId, favorites) => {
    if (Array.isArray(favorites)) {
        const favorite = favorites.find(fav => fav.product_id === productId);
        return favorite ? { isFavorite: true, favoriteId: favorite.id } : { isFavorite: false, favoriteId: null };
    }
    return { isFavorite: false, favoriteId: null };
};