import React, { useState } from 'react';

import { ProductCard } from '@/components/productCard/ProductCard.component.tsx';
import SearchBarComponent from '@/components/searchBar/SearchBar.component.tsx';
import { Categories, SortFilters } from '@/constants/sortFilters.ts';
import type { Product } from '@/interfaces/Product.ts';

import styles from './productsList.module.css';

export interface ProductsListComponentProps {
    products: Product[];
    selectedProducts: number[];
    setSelectedProducts: (products: number[]) => void;
}

export const ProductsListComponent: React.FC<ProductsListComponentProps> = ({ products, selectedProducts, setSelectedProducts }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortOption, setSortOption] = useState<string | null>(null);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleCategoryClick = (category: string) => {
        setSelectedCategory((previousCategory) => (previousCategory === category ? null : category));
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(event.target.value);
    };

    const handleCartClick = (productId: number) => {
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(selectedProducts.filter((id) => id !== productId));
        } else {
            setSelectedProducts([...selectedProducts, productId]);
        }
    };

    const filteredProducts = products
        .filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter((product) => {
            if (!selectedCategory) return true;
            return product.category.name.toLowerCase() === selectedCategory.toLowerCase();
        })
        .sort((a, b) => {
            if (sortOption === SortFilters.highLow) return b.price - a.price;
            if (sortOption === SortFilters.newest) return new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime();
            if (sortOption === SortFilters.oldest) return new Date(a.creationAt).getTime() - new Date(b.creationAt).getTime();
            return 0;
        });

    return (
        <div className={styles['products-container']}>
            <div className={styles['sidebar']}>
                <SearchBarComponent onSearch={handleSearch} />
                <div className={styles['sidebar-filters']}>
                    <div className={styles['filters']}>
                        {Object.values(Categories).map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id)}
                                className={`${styles['filter-button']} ${selectedCategory === category.id ? styles['active'] : ''}`}
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
                    {filteredProducts.map((product) => (
                        <ProductCard
                            onCartClick={() => handleCartClick(product.id)}
                            isProductInCart={selectedProducts.includes(product.id)}
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
