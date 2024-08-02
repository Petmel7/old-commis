
// import React, { useState, useEffect } from 'react';
// import { CartProvider } from '../context/CartContext';
// import Layout from '../components/Layout/Layout';
// import '../styles/globals.css';

// function MyApp({ Component, pageProps }) {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [isRegistered, setIsRegistered] = useState(false);
//     const [isGoogleRegistered, setIsGoogleRegistered] = useState(false);

//     useEffect(() => {
//         const accessToken = localStorage.getItem('accessToken');
//         if (accessToken) {
//             setIsAuthenticated(true);
//         }
//         const registered = localStorage.getItem('isRegistered') === 'true';
//         if (registered) {
//             setIsRegistered(true);
//         }
//         const googleRegistered = localStorage.getItem('isGoogleRegistered') === 'true';
//         if (googleRegistered) {
//             setIsGoogleRegistered(true);
//         }
//     }, []);

//     const handleRegister = () => {
//         setIsRegistered(true);
//         localStorage.setItem('isRegistered', 'true');
//     };

//     const handleLogin = () => {
//         setIsAuthenticated(true);
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         setIsAuthenticated(false);
//     };

//     return (
//         <CartProvider>
//             <Layout
//                 isAuthenticated={isAuthenticated}
//                 handleLogin={handleLogin}
//                 handleLogout={handleLogout}
//                 isRegistered={isRegistered}
//             >
//                 <div className='container'>
//                     <Component
//                         {...pageProps}
//                         isRegistered={isRegistered}
//                         isAuthenticated={isAuthenticated}
//                         isGoogleRegistered={isGoogleRegistered}
//                         onLogin={handleLogin}
//                         onRegister={handleRegister}
//                         onLogout={handleLogout}
//                         setGoogleRegistered={(value) => {
//                             setIsGoogleRegistered(value);
//                             localStorage.setItem('isGoogleRegistered', value.toString());
//                         }}
//                     />
//                 </div>
//             </Layout>
//         </CartProvider>
//     );
// }

// export default MyApp;


import React from 'react';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <CartProvider>
                <Layout>
                    <div className='container'>
                        <Component {...pageProps} />
                    </div>
                </Layout>
            </CartProvider>
        </AuthProvider>
    );
}

export default MyApp;
