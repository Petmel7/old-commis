
import React from 'react';
import styles from './styles/Loading.module.css';

const Loading = ({ size = '48px', color = '#007bff' }) => {
    return (
        <div className={styles.loadingContainer}>
            <div
                className={styles.loading}
                style={{ width: size, height: size, borderColor: color, borderBottomColor: 'transparent' }}
            >
            </div>
        </div>
    );
};

export default Loading;
