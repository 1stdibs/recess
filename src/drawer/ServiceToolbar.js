import React, { useState, useEffect } from 'react';

import styles from './styles/ServiceToolbar.module.css';

export default function Service({ service, onChange }) {
    const [searchText, setSearchText] = useState("");

    useEffect(
        () => {
            onChange(searchText)
        },
        [searchText]
    )

    return <input className={styles.wrapper} placeholder="Search" value={searchText} onChange={e => setSearchText(e.target.value)} />;
}
