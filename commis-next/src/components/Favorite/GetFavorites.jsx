
import React, { useState, useEffect } from 'react';
import { useFavorites } from '@/context/FavoritesContext';
import ProductCard from '../Product/ProductCard';
import BackButton from '../BackButton/BackButton';
import NoSelectedProducts from '../NoSelectedProducts/NoSelectedProducts';
import styles from '../Product/styles/ProductCard.module.css';
import useLoadingAndError from '@/hooks/useLoadingAndError';

const GetFavorites = () => {
    const { favorites, loadFavorites } = useFavorites();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadingErrorComponent = useLoadingAndError(loading, error);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await loadFavorites();
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loadingErrorComponent) return loadingErrorComponent;

    if (favorites.length === 0) {
        return <NoSelectedProducts />;
    }

    return (
        <>
            <BackButton />
            <ul className={styles.productList}>
                {favorites.map(favorite => (
                    favorite.product && (
                        <li className={styles.productChildren} key={favorite.product.id}>
                            <ProductCard
                                product={favorite.product}
                                isFavorite={true}
                                favoriteId={favorite.id}
                            />
                        </li>
                    )
                ))}
            </ul>
        </>
    );
};

export default GetFavorites;







