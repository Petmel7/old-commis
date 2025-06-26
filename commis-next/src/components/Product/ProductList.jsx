
import React from 'react';
import ProductCard from './ProductCard';
import { useFavorites } from '@/context/FavoritesContext';
import { isProductFavorite } from '@/utils/favorites';
import styles from './styles/ProductList.module.css';

const ProductList = ({ products }) => {
    const { favorites } = useFavorites();

    return (
        <ul className={styles.productList}>
            {products.map(product => {
                const { isFavorite, favoriteId } = isProductFavorite(product.id, favorites);
                return (
                    <li className={styles.productCardWrapper} key={product.id}>
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

