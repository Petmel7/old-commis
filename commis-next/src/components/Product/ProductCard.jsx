
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { baseUrl } from '../Url/baseUrl';
import { truncateText } from '@/utils/truncateText';
import { addFavorite, deleteFavorite } from '@/services/favorites';
import BuyButton from '../BuyButton/BuyButton';
import HeartIcon from '../../../public/img/Heart.svg';
import styles from './styles/ProductCard.module.css';
import { useFavorites } from '../../context/FavoritesContext';  // Підключаємо контекст вибраного

const ProductCard = ({ product, isFavorite = false, favoriteId = null }) => {
    const [favoriteStatus, setFavoriteStatus] = useState(isFavorite);
    const [favoriteRecordId, setFavoriteRecordId] = useState(favoriteId);
    const { saveFavorite, removeFavorite } = useFavorites();  // Отримуємо функції з контексту

    useEffect(() => {
        setFavoriteStatus(isFavorite);
        setFavoriteRecordId(favoriteId);
    }, [isFavorite, favoriteId]);

    const handleFavoriteClick = async () => {
        try {
            if (favoriteStatus && favoriteRecordId) {
                await deleteFavorite(favoriteRecordId);
                setFavoriteStatus(false);
                setFavoriteRecordId(null);
                removeFavorite(favoriteRecordId);  // Оновлюємо контекст після видалення
            } else {
                const response = await addFavorite(product.id);
                setFavoriteStatus(true);
                setFavoriteRecordId(response.id);
                saveFavorite(response);  // Оновлюємо контекст після додавання
            }
        } catch (error) {
            console.error('Помилка при оновленні статусу вибраного:', error);
        }
    };

    const firstImage = product.images && product.images.length > 0 ? product.images[0] : '';

    return (
        <div className={styles.productCard}>
            <Link href={`/products/details/${product.id}`}>
                <div className={styles.productCardImageContainer}>
                    <img className={styles.productCardImage} src={`${baseUrl}${firstImage}`} alt={product.name} />
                </div>
            </Link>
            <h2 className={styles.productCardName}>
                {truncateText(product.name, 15)}
            </h2>
            <p className={styles.productCardPrice}>Ціна: {product.price} грн</p>
            <BuyButton product={product} />

            <HeartIcon
                className={`${styles.favoriteButton} 
                ${favoriteStatus ? styles.favorite : ''}`}
                onClick={handleFavoriteClick}
            />
        </div>
    );
};

export default ProductCard;
