import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import useToggle from '@/hooks/useToggle';
import ContentCatalog from './ContentCatalog';
import Home from '../../../public/img/Home.svg';
import Heart from '../../../public/img/Heart.svg';
import Bullets from '../../../public/img/Bullets.svg';
import CartIcon from '../../../public/img/Cart.svg';
import styles from './styles/NavIcons.module.css';

const NavIcons = () => {
    const { cart } = useCart();
    const { favorites } = useFavorites();
    const { isOpen, handleOpenClick, handleCloseClick } = useToggle();

    const favoritesCount = favorites.length;
    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <ul className={styles.iconContainer}>
            <li className={styles.iconItem}>
                <Link href="/">
                    <div className={styles.linkContainer}>
                        <Home className={styles.icon} />
                        <p className={styles.text}>Головна</p>
                    </div>
                </Link>
            </li>
            <li className={styles.iconItem}>
                <div className={styles.linkContainer} onClick={handleOpenClick}>
                    <Bullets className={styles.icon} />
                    <p className={styles.text}>Каталог</p>
                </div>
                <ContentCatalog isOpen={isOpen} handleCloseClick={handleCloseClick} />
            </li>
            <li className={styles.iconItem}>
                <Link href="/getFavorites">
                    <div className={styles.linkContainer}>
                        <div className={styles.cartIconContainer}>
                            <Heart className={styles.icon} />
                            {favoritesCount > 0 && (
                                <div className={styles.favoritesBadge}>{favoritesCount}</div>
                            )}
                        </div>
                        <p className={styles.text}>Вибране</p>
                    </div>
                </Link>
            </li>
            <li className={styles.iconItem}>
                <Link href="/cart">
                    <div className={styles.linkContainer}>
                        <div className={styles.cartIconContainer}>
                            <CartIcon className={styles.icon} />
                            {cartItemCount > 0 && (
                                <div className={styles.cartBadge}>{cartItemCount}</div>
                            )}
                        </div>
                        <p className={styles.text}>Корзина</p>
                    </div>
                </Link>
            </li>
        </ul>
    );
};

export default NavIcons;
