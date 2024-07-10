import React from 'react';
import Login from '../components/User/Login';

const LoginPage = ({ onLogin }) => (
    <div>
        <Login onLogin={onLogin} />
    </div>
);

export default LoginPage;