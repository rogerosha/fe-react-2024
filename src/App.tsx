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
        const productsInCart = localStorage.getItem('cart');
        if (productsInCart) setSelectedProducts(JSON.parse(productsInCart));
    }, []);

    function handleClick(product: Product) {
        const cartRawData = localStorage.getItem('cart');
        const productsInCart: number[] = cartRawData ? JSON.parse(cartRawData) : [];

        if (productsInCart.includes(product.id)) {
            const removedProducts = productsInCart.filter((id) => id !== product.id);
            setSelectedProducts(removedProducts);
            localStorage.setItem('cart', JSON.stringify(removedProducts));
            return;
        }

        productsInCart.push(product.id);
        setSelectedProducts(productsInCart);
        localStorage.setItem('cart', JSON.stringify(productsInCart));
    }

    return (
        <div className={styles['app']}>
            <HeaderComponent selectedProducts={selectedProducts} page={page} onPageClick={onPageClick} />
            {page === 'about' && <AboutComponent />}
            {page === 'products' && (
                <ProductsListComponent
                    setSelectedProducts={setSelectedProducts}
                    selectedProducts={selectedProducts}
                    products={products}
                    onProductClick={handleClick}
                />
            )}
            <FooterComponent />
        </div>
    );
}

export default App;
