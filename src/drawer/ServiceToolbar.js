import React, { useState, useEffect } from 'react';

import styles from './styles/ServiceToolbar.module.css';
import { ReactComponent as SearchIcon } from '../icons/filter.svg';
import { ReactComponent as ClearIcon } from '../icons/clear filter.svg';

// from https://usehooks.com/useDebounce/
function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
        () => {
            // Update debounced value after delay
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            // Cancel the timeout if value changes (also on delay change or unmount)
            // This is how we prevent debounced value from updating if value is changed ...
            // .. within the delay period. Timeout gets cleared and restarted.
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
}

export default function ServiceToolbar({ service, onChange, placeholder = 'Search' }) {
    const [searchText, setSearchText] = useState('');
    const debouncedSearchTerm = useDebounce(searchText, 300);

    useEffect(() => {
        onChange(debouncedSearchTerm);
    }, [debouncedSearchTerm, onChange]);

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
                onChange={(e) => setSearchText(e.target.value)}
            />
            {icon}
        </>
    );
}
