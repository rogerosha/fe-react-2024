import React from 'react';

import styles from './pagination.module.css';

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const MAX_UNCOLLAPSED_PAGES_COUNT = 3;

const range = (start: number, end: number): number[] => {
    const length = end - start + 1;
    return Array.from({ length }, (_, index) => start + index);
};

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const createPageNumbers = (): (number | string)[] => {
        let pages: (number | string)[] = [];

        if (totalPages <= MAX_UNCOLLAPSED_PAGES_COUNT) {
            pages = range(1, totalPages);
        } else {
            if (currentPage <= 2) {
                pages = [...range(1, 3), '...', totalPages];
            } else if (currentPage >= totalPages - 1) {
                pages = [1, '...', ...range(totalPages - 2, totalPages)];
            } else if (currentPage === 3) {
                pages = [...range(1, 4), '...', totalPages];
            } else if (currentPage === totalPages - 2) {
                pages = [1, '...', ...range(totalPages - 3, totalPages)];
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
