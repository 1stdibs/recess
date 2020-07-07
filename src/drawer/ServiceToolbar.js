import React, { useState, useEffect } from 'react';

import styles from './styles/ServiceToolbar.module.css';
import { ReactComponent as SearchIcon } from '../icons/filter.svg';
import { ReactComponent as ClearIcon } from '../icons/clear filter.svg';
import debounce from 'lodash.debounce';

export default function Service({ service, onChange, placeholder = 'Search' }) {
    const [searchText, setSearchText] = useState('');

    useEffect(
        debounce(() => {
            onChange(searchText);
        }, 300),
        [searchText, onChange]
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
                placeholder={placeholder}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
            />
            {icon}
        </>
    );
}
