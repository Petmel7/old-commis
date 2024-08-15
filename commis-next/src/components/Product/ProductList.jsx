
import React from 'react';
import ProductCard from './ProductCard';
import styles from './styles/ProductCard.module.css';
import { useFavorites } from '@/context/FavoritesContext';

const ProductList = ({ products }) => {
    const { favorites } = useFavorites();

    const isProductFavorite = (productId) => {
        const favorite = favorites.find(fav => fav.product_id === productId);
        return favorite ? { isFavorite: true, favoriteId: favorite.id } : { isFavorite: false, favoriteId: null };
    };

    return (
        <ul className={styles.productList}>
            {products.map(product => {
                const { isFavorite, favoriteId } = isProductFavorite(product.id);
                return (
                    <li className={styles.productChildren} key={product.id}>
                        <ProductCard
                            product={product}
                            isFavorite={isFavorite}
                            favoriteId={favoriteId}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default ProductList;


