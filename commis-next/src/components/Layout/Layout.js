
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import styles from './styles/Layout.module.css';

const Layout = ({ children, isAuthenticated, handleLogout }) => {
    return (
        <div className={styles.layout}>
            <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <div className={styles.layoutContent}>
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
