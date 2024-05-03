import React, { useEffect, useState } from 'react';

import { ProductsListComponent } from '@/components/productsList/ProductsList.component.tsx';

import { FooterComponent } from './components/footer/Footer.component.tsx';
import { HeaderComponent } from './components/header/Header.component.tsx';

// import { AboutComponent } from './components/about/About.component.tsx';
import './App.css';

function App() {
    const [products, setProducts] = useState([]);

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

    return (
        <div>
            <HeaderComponent />
            <ProductsListComponent products={products} />
            <FooterComponent />
        </div>
    );
}

export default App;
