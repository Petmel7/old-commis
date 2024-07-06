import React from 'react';
import Footer from './Footer';
import Header from './Header';
import styles from './styles/Layout.module.css';

const Layout = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.layoutContent}>
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;