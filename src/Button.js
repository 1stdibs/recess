import React from 'react';
import classNames from 'classnames';
import styles from './styles/Button.module.css';

export default function Button({ onClick, className, children, disabled, title, type = 'button' }) {
    return (
        <button
            type={type}
            title={title}
            className={classNames(styles.button, className)}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
