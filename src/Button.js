import React from 'react';
import classNames from 'classnames';
import styles from './styles/Button.module.css';

export default function Button({ onClick, className, children, disabled, title }) {
    return (
        <button
            type="button"
            title={title}
            className={classNames(styles.button, className)}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
