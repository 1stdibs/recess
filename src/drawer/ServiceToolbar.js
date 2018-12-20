import React, { useState, useEffect } from 'react';

import styles from './styles/ServiceToolbar.module.css';
import { ReactComponent as SearchIcon } from '../icons/filter.svg';
import { ReactComponent as ClearIcon } from '../icons/clear filter.svg';

export default function Service({ service, onChange }) {
    const [searchText, setSearchText] = useState('');

    useEffect(
        () => {
            onChange(searchText);
        },
        [searchText]
    );

    const icon = searchText ? (
        <ClearIcon className={`${styles.icon} ${styles.clear}`} onClick={() => setSearchText('')} />
    ) : (
        <SearchIcon className={styles.icon} />
    );

    return (
        <>
            <input
                className={styles.wrapper}
                placeholder="Search"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
            />
            {icon}
        </>
    );
}
