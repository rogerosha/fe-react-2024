import React, { useEffect, useState } from 'react';

import type { Product } from '@/interfaces/Product.ts';
import type { PageRoute } from '@/interfaces/Routing.ts';
import { AboutComponent } from '@/pages/about/About.component.tsx';
import { ProductsListComponent } from '@/pages/productsList/ProductsList.component.tsx';

import { FooterComponent } from './components/footer/Footer.component.tsx';
import { HeaderComponent } from './components/header/Header.component.tsx';

import styles from './App.module.css';

function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState<PageRoute>('products');
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

    const onPageClick = (newPage: PageRoute) => setPage(newPage);

    useEffect(() => {
        const loadPageFromLocalStorage = () => {
            const savedPage = localStorage.getItem('savedPage');
            if (savedPage) {
                setPage(JSON.parse(savedPage));
            }
        };

        loadPageFromLocalStorage();
    }, []);

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
    }, []);

    useEffect(() => {
        localStorage.setItem('savedPage', JSON.stringify(page));
    }, [page]);

    return (
        <div className={styles['app']}>
            <HeaderComponent selectedProducts={selectedProducts} page={page} onPageClick={onPageClick} />
            {page === 'about' && <AboutComponent />}
            {page === 'products' && (
                <ProductsListComponent setSelectedProducts={setSelectedProducts} selectedProducts={selectedProducts} products={products} />
            )}
            <FooterComponent />
        </div>
    );
}

export default App;
