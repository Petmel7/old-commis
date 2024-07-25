
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import styles from './styles/Layout.module.css';

const Layout = ({ isAuthenticated, handleLogin, handleLogout, children }) => (
    <div className={styles.layout}>
        <Header isAuthenticated={isAuthenticated} handleLogin={handleLogin} />
        <div className={styles.layoutContent}>
            <main className={styles.main}>{children}</main>
        </div>
        <Footer onLogout={handleLogout} />
    </div>
);

export default Layout;
