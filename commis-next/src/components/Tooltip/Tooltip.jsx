
import React from 'react';
import styles from './styles/Tooltip.module.css';

const Tooltip = ({ children, text, position = 'bottom' }) => {
    return (
        <div className={styles.iconWrapper}>
            {children}
            <span className={`${styles.tooltip} ${styles[position]}`}>{text}</span>
        </div>
    );
};

export default Tooltip;
