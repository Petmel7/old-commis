
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <Layout isAuthenticated={isAuthenticated} handleLogin={handleLogin} handleLogout={handleLogout}>
            <div className='container'>
                <Component {...pageProps} onLogin={handleLogin} />
            </div>
        </Layout>
    );
}

export default MyApp;
