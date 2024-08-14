
import React from 'react';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <FavoritesProvider >
            <AuthProvider>
                <CartProvider>
                    <Layout>
                        <div className='container'>
                            <Component {...pageProps} />
                        </div>
                    </Layout>
                </CartProvider>
            </AuthProvider>
        </FavoritesProvider >
    );
}

export default MyApp;
