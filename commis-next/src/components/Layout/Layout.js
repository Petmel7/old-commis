

import React from 'react';
import Footer from './Footer';
import Header from './Header';
import styles from './styles/Layout.module.css';

const Layout = ({ isAuthenticated, handleLogin, handleLogout, isRegistered, children }) => (
    <div className={styles.layout}>
        <Header isAuthenticated={isAuthenticated} handleLogin={handleLogin} />
        <div className={styles.layoutContent}>
            <main className={styles.main}>{children}</main>
        </div>
        <Footer onLogout={handleLogout} /> {/* Передаємо функцію onLogout */}
    </div>
);

export default Layout;

