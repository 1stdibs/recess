import React from 'react';
import styles from './styles/Input.module.css';

export default function Input(props) {
    return <input className={styles.input} {...props} />;
}
