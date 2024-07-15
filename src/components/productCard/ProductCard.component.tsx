import React from 'react';
import { useNavigate } from 'react-router-dom';

import type { Product } from '@/interfaces/Product';

import CartIcon from '../../assets/cart.svg?react';

import styles from './productCard.module.css';

interface ProductCardProps {
    product: Product;
    onCartClick: (product: Product) => void;
    isProductInCart: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onCartClick, isProductInCart }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/products/${product.id}`);
    };

    return (
        <div className={styles['product-card']} onClick={handleCardClick}>
            <div className={styles['image-container']}>
                <img className={styles['product-image']} src={product.images[0]} alt={product.title} />
            </div>
            <h2 className={styles['product-title']}>{product.title}</h2>
            <div className={styles['price-container']}>
                <p className={styles['product-price']}>
                    {product.price}
                    <span className={styles['currency-sign']}>₴</span>
                </p>
                <button
                    onClick={(event) => {
                        event.stopPropagation();
                        onCartClick(product);
                    }}
                    className={styles['cart-button']}
                >
                    <CartIcon className={`${styles['cart-icon']} ${isProductInCart ? styles['in-cart'] : ''}`} />
                </button>
            </div>
        </div>
    );
};
