import React, { useContext, useEffect, useState } from 'react';

import type { Product } from '@/interfaces/Product.ts';
import type { PageRoute } from '@/interfaces/Routing.ts';
import { AboutComponent } from '@/pages/about/About.component.tsx';
import { ProductsListComponent } from '@/pages/productsList/ProductsList.component.tsx';

import { FooterComponent } from './components/footer/Footer.component.tsx';
import { HeaderComponent } from './components/header/Header.component.tsx';
import { ThemeComponent } from './components/theme/Theme.component.tsx';
import { CartContext, ThemeContext } from './contexts';

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
        setTheme((previousTheme) => (previousTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://ma-backend-api.mocintra.com/api/v1/products?limit=50&offset=0');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data.products);
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

    const addProductToCart = (productId: number) => {
        setSelectedProducts((previousSelectedProducts) => {
            const updatedProducts = [...previousSelectedProducts, productId];
            localStorage.setItem('cart', JSON.stringify(updatedProducts));
            return updatedProducts;
        });
    };

    const removeProductFromCart = (productId: number) => {
        setSelectedProducts((previousSelectedProducts) => {
            const updatedProducts = previousSelectedProducts.filter((id) => id !== productId);
            localStorage.setItem('cart', JSON.stringify(updatedProducts));
            return updatedProducts;
        });
    };

    return (
        <ThemeComponent>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <CartContext.Provider value={{ selectedProducts, addProductToCart, removeProductFromCart }}>
                    <div className={`${styles.app} ${theme === 'dark' ? 'app-dark-mode' : 'app-light-mode'}`}>
                        <HeaderComponent selectedProducts={selectedProducts} page={page} onPageClick={onPageClick} />
                        {page === 'about' && <AboutComponent />}
                        {page === 'products' && <ProductsListComponent products={products} />}
                        <FooterComponent />
                    </div>
                </CartContext.Provider>
            </ThemeContext.Provider>
        </ThemeComponent>
    );
}

export default App;
export const useCart = () => useContext(CartContext);
export const useTheme = () => useContext(ThemeContext);
