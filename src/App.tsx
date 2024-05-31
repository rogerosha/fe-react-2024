import React, { useEffect, useState } from 'react';

import type { Product } from '@/interfaces/Product.ts';
import type { PageRoute } from '@/interfaces/Routing.ts';
import { AboutComponent } from '@/pages/about/About.component.tsx';
import { ProductsListComponent } from '@/pages/productsList/ProductsList.component.tsx';

import { FooterComponent } from './components/footer/Footer.component.tsx';
import { HeaderComponent } from './components/header/Header.component.tsx';
import { ThemeComponent } from './components/theme/Theme.component.tsx';

import styles from './App.module.css';

function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState<PageRoute>('products');
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const onPageClick = (newPage: PageRoute) => setPage(newPage);
    const toggleTheme = () => setIsDarkMode((previousMode) => !previousMode);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://ma-backend-api.mocintra.com/api/v1/products?limit=8&offset=2');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
        setSelectedProducts(JSON.parse(localStorage.getItem('cart') || '[]'));
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    function handleClick(newProducts: number[]) {
        setSelectedProducts(newProducts);
        localStorage.setItem('cart', JSON.stringify(newProducts));
    }

    return (
        <ThemeComponent>
            <div className={`${styles.app} ${isDarkMode ? 'app-dark-mode' : 'app-light-mode'}`}>
                <HeaderComponent
                    selectedProducts={selectedProducts}
                    page={page}
                    onPageClick={onPageClick}
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                />
                {page === 'about' && <AboutComponent />}
                {page === 'products' && (
                    <ProductsListComponent setSelectedProducts={handleClick} selectedProducts={selectedProducts} products={products} />
                )}
                <FooterComponent />
            </div>
        </ThemeComponent>
    );
}

export default App;
