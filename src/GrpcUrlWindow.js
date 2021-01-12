import React from 'react';
import MovableWindow from './MovableWindow';
import styles from './styles/GrpcUrlWindow.module.css';

const GrpcUrlWindow = ({ message = '', isVisible, onCloseClick }) => (
    <MovableWindow
        onCloseClick={onCloseClick}
        isVisible={isVisible}
        title="Command copied to clipboard:"
    >
        <textarea tabIndex={-1} readOnly className={styles.clipboard} rows={16} value={message} />
    </MovableWindow>
);

export default GrpcUrlWindow;
