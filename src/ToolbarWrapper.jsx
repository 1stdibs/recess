import React from 'react';
import styles from './styles/ToolbarWrapper.module.css';

export default function ToolbarWrapper({ children, toolbar }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.toolbar}>{toolbar}</div>
            <div className={styles.containerWrapper}>{children}</div>
        </div>
    );
}
