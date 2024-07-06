// pages/_app.js

import React from 'react';
import Layout from '../components/Layout/Layout';
import { SessionProvider } from 'next-auth/react';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <SessionProvider session={pageProps.session}>
            <Layout>
                <div className='container'>
                    <Component {...pageProps} />
                </div>
            </Layout>
        </SessionProvider>
    );
}

export default MyApp;


