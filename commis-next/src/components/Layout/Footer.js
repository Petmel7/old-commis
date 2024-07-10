import React from 'react';
import Link from 'next/link';
import styles from './styles/Footer.module.css';
import Home from '../../../public/img/Home.svg';
import More from '../../../public/img/More.svg';
import Heart from '../../../public/img/Heart.svg';
import Bullets from '../../../public/img/Bullets.svg';
import Cart from '../../../public/img/Cart.svg';

const Footer = () => (
    <footer className={styles.footer}>
        <ul className={styles.iconContainer}>
            <li className={styles.iconItem}>
                <Link href="/">
                    <Home className={styles.icon} />
                    <p className={styles.text}>Головна</p>
                </Link>
            </li>
            <li className={styles.iconItem}>
                <Link href="/categories">
                    <Bullets className={styles.icon} />
                    <p className={styles.text}>Каталог</p>
                </Link>
            </li>
            <li className={styles.iconItem}>
                <Link href="/favorites">
                    <Heart className={styles.icon} />
                    <p className={styles.text}>Вибране</p>
                </Link>
            </li>
            <li className={styles.iconItem}>
                <Link href="/cart">
                    <Cart className={styles.icon} />
                    <p className={styles.text}>Корзина</p>
                </Link>
            </li>
            <li className={styles.iconItem}>
                <Link href="/more">
                    <More className={styles.icon} />
                    <p className={styles.text}>Ще</p>
                </Link>

            </li>
        </ul>
    </footer>
);

export default Footer;
