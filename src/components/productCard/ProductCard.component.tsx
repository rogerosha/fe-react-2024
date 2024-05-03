import React from 'react';

import type { Product } from '@/interfaces/Product.ts';

import styles from './productCard.module.css';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
    <div className={styles['product-card']}>
        <div className="image-container">
            <img className={styles['product-image']} src={product.images[0]} alt={product.title} />
        </div>
        <div className={styles['title-container']}>
            <h2 className={styles['product-title']}>{product.title}</h2>
        </div>
        <p className={styles['product-price']}>Price: ${product.price}</p>
    </div>
);
