import React from 'react';

import type { Product } from '@/interfaces/Product.ts';

import CartIcon from '../../assets/cart.svg?react';

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
            <button onClick={() => onCartClick(product)} className={styles['cart-button']}>
                <CartIcon className={`${styles['cart-icon']} ${isProductInCart ? styles['in-cart'] : ''}`} />
            </button>
        </div>
    </div>
);
