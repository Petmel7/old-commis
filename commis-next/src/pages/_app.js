// pages/_app.js
// src/pages/_app.js
import React from 'react';
import Header from '../components/Layout/Header';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Header />
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;

