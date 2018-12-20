import React from 'react';

import styles from './styles/ServiceToolbar.module.css';

export default function Service({ service, onChange }) {
    return <input className={styles.wrapper} placeholder="Search" onChange={event => {
        onChange(event.target.value);
    }} />;
}
