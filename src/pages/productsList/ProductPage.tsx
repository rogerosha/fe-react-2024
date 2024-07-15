import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { Product } from '@/interfaces/Product';

import styles from './ProductPage.module.css';

interface ProductPageProps {
    getProduct: (id: number) => Promise<Product | null>;
}

const ProductPage: React.FC<ProductPageProps> = ({ getProduct }) => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const productId = Number(id);
            const fetchedProduct = await getProduct(productId);
            setProduct(fetchedProduct);
            setLoading(false);
        };

        fetchProduct();
    }, [id, getProduct]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className={styles['product-page-container']}>
            <div className={styles['image-description']}>
                <div className={styles['product-image-container']}>
                    <img src={product.images[0]} alt={product.title} className={styles['product-image']} />
                </div>
                <div className={styles['product-details']}>
                    <h1 className={styles['product-title']}>{product.title}</h1>
                    <p className={styles['product-description']}>{product.description}</p>
                    <div className={styles['price-container']}>
                        <p className={styles['product-price']}>
                            {product.price} <span className={styles['hryvnia-sign']}>₴</span>
                        </p>
                        <button className={styles['add-to-cart-button']}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
