import React from 'react';

import styles from './pagination.module.css';

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const createPageNumbers = () => {
        let pages: (number | string)[] = [];

        if (totalPages <= 3) {
            for (let index = 1; index <= totalPages; index++) {
                pages.push(index);
            }
        } else {
            switch (currentPage) {
                case 1: {
                    pages = [1, 2, '...', totalPages];

                    break;
                }
                case totalPages: {
                    pages = [1, '...', totalPages - 1, totalPages];

                    break;
                }
                case 2: {
                    pages = [1, 2, 3, '...', totalPages];

                    break;
                }
                case totalPages - 1: {
                    pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];

                    break;
                }
                default: {
                    pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
                }
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
