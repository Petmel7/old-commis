import React from 'react';
import Register from '../components/User/Register';

const RegisterPage = ({ onLogin }) => (
    <div>
        <Register onLogin={onLogin} />
    </div>
);

export default RegisterPage;