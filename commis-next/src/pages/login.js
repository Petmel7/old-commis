
import React from 'react';
import Login from '../components/User/Login';

const LoginPage = ({ onLogin, onRegister, onPhoneAdded, isAuthenticated, isRegistered }) => (
    <div>
        <Login
            onLogin={onLogin}
            onPhoneAdded={onPhoneAdded}
            onRegister={onRegister} // Передаємо функцію реєстрації
            isAuthenticated={isAuthenticated}
            isRegistered={isRegistered}
        />
    </div>
);

export default LoginPage;
