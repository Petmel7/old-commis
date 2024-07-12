
// import React, { useState, useEffect } from 'react';
// import Layout from '../components/Layout/Layout';
// import '../styles/globals.css';

// function MyApp({ Component, pageProps }) {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         const accessToken = localStorage.getItem('accessToken');
//         if (accessToken) {
//             setIsAuthenticated(true);
//         }
//     }, []);

//     const handleLogin = () => {
//         setIsAuthenticated(true);
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         setIsAuthenticated(false);
//     };

//     return (
//         <Layout isAuthenticated={isAuthenticated} handleLogin={handleLogin} handleLogout={handleLogout}>
//             <div className='container'>
//                 <Component {...pageProps} onLogin={handleLogin} isAuthenticated={isAuthenticated} />
//             </div>
//         </Layout>
//     );
// }

// export default MyApp;



import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    console.log('MyApp->isAuthenticated@@@', isAuthenticated);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
    };

    return (
        <Layout isAuthenticated={isAuthenticated} handleLogin={handleLogin} handleLogout={handleLogout}>
            <div className='container'>
                <Component {...pageProps} onLogin={handleLogin} isAuthenticated={isAuthenticated} />
            </div>
        </Layout>
    );
}

export default MyApp;

