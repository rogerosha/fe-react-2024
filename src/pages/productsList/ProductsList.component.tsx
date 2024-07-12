import React, { useEffect, useState } from 'react';

import { useCart, useTheme } from '@/App.tsx';
import { Pagination } from '@/components/pagination/Pagination.component.tsx';
import { ProductCard } from '@/components/productCard/ProductCard.component.tsx';
import SearchBarComponent from '@/components/searchBar/SearchBar.component.tsx';
import { Categories, SortFilters } from '@/constants/sortFilters.ts';
import type { Product } from '@/interfaces/Product.ts';

import styles from './productsList.module.css';

const PRODUCTS_ON_PAGE = 8;

export interface ProductsListComponentProps {
    products: Product[];
}

export const ProductsListComponent: React.FC<ProductsListComponentProps> = ({ products }) => {
    const { selectedProducts, addProductToCart, removeProductFromCart } = useCart();
    const { theme } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [sortOption, setSortOption] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    useEffect(() => {
        let updatedProducts = products;

        if (searchQuery) {
            updatedProducts = updatedProducts.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        if (selectedCategories.length > 0) {
            updatedProducts = updatedProducts.filter((product) => selectedCategories.includes(product.category.name.toLowerCase()));
        }

        updatedProducts = updatedProducts.sort((a, b) => {
            if (sortOption === SortFilters.highLow) return b.price - a.price;
            if (sortOption === SortFilters.newest) return new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime();
            if (sortOption === SortFilters.oldest) return new Date(a.creationAt).getTime() - new Date(b.creationAt).getTime();
            return 0;
        });

        setFilteredProducts(updatedProducts);
        setCurrentPage(1);
    }, [searchQuery, selectedCategories, sortOption, products]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleCategoryClick = (category: string) => {
        setSelectedCategories((previousCategories) => {
            if (previousCategories.includes(category)) {
                return previousCategories.filter((cat) => cat !== category);
            }
            return [...previousCategories, category];
        });
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(event.target.value);
    };

    const handleCartClick = (productId: number) => {
        if (selectedProducts.includes(productId)) {
            removeProductFromCart(productId);
        } else {
            addProductToCart(productId);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_ON_PAGE);
    const startIndex = (currentPage - 1) * PRODUCTS_ON_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_ON_PAGE);

    return (
        <div className={`${styles['products-container']} ${theme === 'dark' ? styles['dark-mode'] : styles['light-mode']}`}>
            <div className={styles['sidebar']}>
                <SearchBarComponent onSearch={handleSearch} />
                <div className={styles['sidebar-filters']}>
                    <div className={styles['filters']}>
                        {Object.values(Categories).map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id)}
                                className={`${styles['filter-button']} ${selectedCategories.includes(category.id) ? styles['active'] : ''}`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                    <div className={styles['sort-bar']}>
                        <span className={styles['sort-label']}>Sort by: </span>
                        <select onChange={handleSortChange} className={styles['sort-dropdown']}>
                            <option value={SortFilters.highLow}>Price (High - Low)</option>
                            <option value={SortFilters.newest}>Newest</option>
                            <option value={SortFilters.oldest}>Oldest</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={styles['products-content']}>
                <div className={styles['products-list']}>
                    {paginatedProducts.map((product) => (
                        <ProductCard
                            onCartClick={() => handleCartClick(product.id)}
                            isProductInCart={selectedProducts.includes(product.id)}
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};
