
import { useState, useEffect } from 'react';
import { useFavorites } from '@/context/FavoritesContext';
import ProductCard from '../Product/ProductCard';
import BackButton from '../BackButton/BackButton';
import NoSelectedProducts from '../NoSelectedProducts/NoSelectedProducts';
import styles from '../Product/styles/UserProducts.module.css';
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
                        <ProductCard
                            key={favorite.product.id}
                            product={favorite.product}
                            isFavorite={true}
                            favoriteId={favorite.id}
                        />
                    )
                ))}
            </ul>
        </>
    );
};

export default GetFavorites;







