import type { FC } from 'react';
import React, { useState } from 'react';

import styles from './searchBar.module.css';

interface SearchBarComponentProps {
    onSearch: (query: string) => void;
}

const SearchBarComponent: FC<SearchBarComponentProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className={styles['search-bar']}>
            <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className={styles['search-input']}
                placeholder="Search..."
            />
            <button onClick={handleSearch} className={styles['search-button']}>
                <img src="./Search_Magnifying_Glass.svg" alt="Search" className={styles['search-icon']} />
            </button>
        </div>
    );
};

export default SearchBarComponent;
