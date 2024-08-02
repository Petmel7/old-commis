// components/ErrorDisplay/ErrorDisplay.js
import React from 'react';

const ErrorDisplay = ({ error }) => {
    return (
        <div>
            <h2>Упс! Щось пішло не так.</h2>
            <p>{error}</p>
        </div>
    );
};

export default ErrorDisplay;
