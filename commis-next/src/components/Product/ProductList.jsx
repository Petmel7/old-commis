
import React from 'react';
import ProductCard from './ProductCard';
import { useFavorites } from '@/context/FavoritesContext';
import { isProductFavorite } from '@/utils/favorites';

const ProductList = ({ products }) => {
    const { favorites } = useFavorites();

    return (
        <ul className='product-list'>
            {products.map(product => {
                const { isFavorite, favoriteId } = isProductFavorite(product.id, favorites);
                return (
                    <ProductCard
                        key={product.id}
                        product={product}
                        isFavorite={isFavorite}
                        favoriteId={favoriteId}
                    />
                );
            })}
        </ul>
    );
};

export default ProductList;

