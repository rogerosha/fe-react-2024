import React, { useState } from 'react';

import { ProductCard } from '@/components/productCard/ProductCard.component.tsx';
import SearchBarComponent from '@/components/searchBar/SearchBar.component.tsx';
import type { Product } from '@/interfaces/Product.ts';

import styles from './productsList.module.css';

const categories = [
    { id: 'electronics', label: 'Electronics' },
    { id: 'shoes', label: 'Shoes' },
    { id: 'clothes', label: 'Clothes' },
];

const highLow = 'high-low';
const newest = 'newest';
const oldest = 'oldest';

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
        setSelectedCategory(category);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(event.target.value);
    };

    const filteredProducts = products
        .filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter((product) => {
            if (!selectedCategory) return true;
            return product.category.name.toLowerCase() === selectedCategory.toLowerCase();
        })
        .sort((a, b) => {
            if (sortOption === highLow) return b.price - a.price;
            if (sortOption === newest) return new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime();
            if (sortOption === oldest) return new Date(a.creationAt).getTime() - new Date(b.creationAt).getTime();
            return 0;
        });

    return (
        <div className={styles['products-container']}>
            <div className={styles['sidebar']}>
                <SearchBarComponent onSearch={handleSearch} />
                <div className={styles['filters']}>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            className={`${styles['filter-button']} ${selectedCategory === category.id ? styles['active'] : ''}`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles['products-content']}>
                <div className={styles['sort-bar']}>
                    <span className={styles['sort-label']}>Sort by: </span>
                    <select onChange={handleSortChange} className={styles['sort-dropdown']}>
                        <option value={highLow}>Price (High - Low)</option>
                        <option value={newest}>Newest</option>
                        <option value={oldest}>Oldest</option>
                    </select>
                </div>
                <div className={styles['products-list']}>
                    {filteredProducts.map((product) => (
                        <ProductCard
                            onCartClick={() => {
                                if (selectedProducts.includes(product.id)) {
                                    setSelectedProducts(selectedProducts.filter((id) => id !== product.id));
                                    return;
                                }
                                setSelectedProducts([...selectedProducts, product.id]);
                            }}
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
