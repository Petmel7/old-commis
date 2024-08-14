
import React from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';  // Підключаємо контекст вибраного
import Logout from '../User/Logout';
import styles from './styles/Footer.module.css';
import Home from '../../../public/img/Home.svg';
import Heart from '../../../public/img/Heart.svg';
import Bullets from '../../../public/img/Bullets.svg';
import CartIcon from '../../../public/img/Cart.svg';

const Footer = () => {
    const { cart } = useCart();
    const { favorites } = useFavorites();  // Отримуємо стан вибраного з контексту

    const favoritesCount = favorites.length;
    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <footer className={styles.footer}>
            <ul className={styles.iconContainer}>
                <li className={styles.iconItem}>
                    <Link href="/">
                        <Home className={styles.icon} />
                        <p className={styles.text}>Головна</p>
                    </Link>
                </li>
                <li className={styles.iconItem}>
                    <Link href="/test">
                        <Bullets className={styles.icon} />
                        <p className={styles.text}>Каталог</p>
                    </Link>
                </li>
                <li className={styles.iconItem}>
                    <Link href="/getFavorites">
                        <div className={styles.cartIconContainer}>
                            <Heart className={styles.icon} />
                            {favoritesCount > 0 && (
                                <div className={styles.favoritesBadge}>{favoritesCount}</div>
                            )}
                            <p className={styles.text}>Вибране</p>
                        </div>
                    </Link>
                </li>
                <li className={styles.iconItem}>
                    <Link href="/cart">
                        <div className={styles.cartIconContainer}>
                            <CartIcon className={styles.icon} />
                            {cartItemCount > 0 && (
                                <div className={styles.cartBadge}>{cartItemCount}</div>
                            )}
                        </div>
                        <p className={styles.text}>Корзина</p>
                    </Link>
                </li>
                <li className={styles.iconItem}>
                    <Logout />
                    <p className={styles.text}>Ще</p>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;
