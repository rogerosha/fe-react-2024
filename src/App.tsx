import React, { useEffect, useState } from 'react';

import type { Product } from '@/interfaces/Product.ts';
import type { PageRoute } from '@/interfaces/Routing.ts';
import { AboutComponent } from '@/pages/about/About.component.tsx';
import { ProductsListComponent } from '@/pages/productsList/ProductsList.component.tsx';

import { FooterComponent } from './components/footer/Footer.component.tsx';
import { HeaderComponent } from './components/header/Header.component.tsx';
import { ThemeComponent } from './components/theme/Theme.component.tsx';

import styles from './App.module.css';

const THEME_KEY = 'theme';

function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState<PageRoute>('products');
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

    const browserTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const savedTheme = localStorage.getItem(THEME_KEY);
    const activeTheme = (savedTheme && savedTheme === 'dark' ? 'dark' : 'light') || browserTheme;

    const [theme, setTheme] = useState<'light' | 'dark'>(activeTheme);

    const onPageClick = (newPage: PageRoute) => setPage(newPage);
    const toggleTheme = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://ma-backend-api.mocintra.com/api/v1/products?limit=50&offset=0');
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
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }

        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    function handleClick(newProducts: number[]) {
        setSelectedProducts(newProducts);
        localStorage.setItem('cart', JSON.stringify(newProducts));
    }

    return (
        <ThemeComponent>
            <div className={`${styles.app} ${theme === 'dark' ? 'app-dark-mode' : 'app-light-mode'}`}>
                <HeaderComponent
                    selectedProducts={selectedProducts}
                    page={page}
                    onPageClick={onPageClick}
                    isDarkMode={theme === 'dark'}
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
