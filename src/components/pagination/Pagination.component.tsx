import React from 'react';

import styles from './pagination.module.css';

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const MAX_UNCOLLAPSED_PAGES_COUNT = 3;

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const createPageNumbers = () => {
        let pages: (number | string)[] = [];

        if (totalPages <= MAX_UNCOLLAPSED_PAGES_COUNT) {
            for (let index = 1; index <= totalPages; index++) {
                pages.push(index);
            }
        } else {
            if (currentPage <= 2) {
                pages = [1, 2, 3, '...', totalPages];
            } else if (currentPage >= totalPages - 1) {
                pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];
            } else if (currentPage === 3) {
                pages = [1, 2, 3, 4, '...', totalPages];
            } else if (currentPage === totalPages - 2) {
                pages = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else {
                pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
            }
        }

        return pages;
    };

    const pageNumbers = createPageNumbers();

    return (
        <div className={styles['pagination']}>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                &lt;
            </button>
            {pageNumbers.map((page, index) =>
                typeof page === 'string' ? (
                    <span key={index}>{page}</span>
                ) : (
                    <button key={index} className={page === currentPage ? styles.active : ''} onClick={() => onPageChange(page as number)}>
                        {page}
                    </button>
                ),
            )}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                &gt;
            </button>
        </div>
    );
};
