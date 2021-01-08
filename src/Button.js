import React from 'react';
import classNames from 'classnames'
import styles from './styles/Button.module.css';

export default function Button({ onClick, className, children }) {
    return (
        <button className={classNames(styles.button, className)} onClick={onClick}>
            {children}
        </button>
    );
}
