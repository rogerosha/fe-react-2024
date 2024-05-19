import React from 'react';

import type { Product } from '@/interfaces/Product.ts';

import styles from './productCard.module.css';

interface ProductCardProps {
    product: Product;
    onCartClick: (product: Product) => void;
    isProductInCart: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onCartClick, isProductInCart }) => (
    <div className={styles['product-card']}>
        <div className={styles['image-container']}>
            <img className={styles['product-image']} src={product.images[0]} alt={product.title} />
        </div>
        <h2 className={styles['product-title']}>{product.title}</h2>
        <div className={styles['price-container']}>
            <p className={styles['product-price']}>
                {product.price}
                <span className={styles['hryvnia-sign']}>₴</span>
            </p>
            <button onClick={() => onCartClick(product)}>
                <img className={styles['cart-1']} src={isProductInCart ? './cart-1.svg' : './cart.svg'} alt="cart-1" />
            </button>
        </div>
    </div>
);
