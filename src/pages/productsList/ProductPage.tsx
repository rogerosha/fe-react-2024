import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { Product } from '@/interfaces/Product';

import styles from './ProductPage.module.css';

interface ProductPageProps {
    getProduct: (id: number) => Promise<Product | null>;
    onAddToCart: (productId: number) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ getProduct, onAddToCart }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const productId = Number(id);
            const fetchedProduct = await getProduct(productId);
            setProduct(fetchedProduct);
            setIsLoading(false);
        };

        fetchProduct();
    }, [id, getProduct]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleAddToCart = () => {
        if (product) {
            onAddToCart(product.id);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    const mainImage = product.images[0];
    const additionalImages = product.images.slice(1, 4);

    return (
        <div className={styles['product-page-container']}>
            <button className={styles['back-button']} onClick={handleBackClick}>
                &lt; Back
            </button>
            <div className={styles['image-description']}>
                <div className={styles['images']}>
                    <div className={styles['product-images']}>
                        <div className={styles['additional-images']}>
                            {additionalImages.map((image, index) => (
                                <img key={index} src={image} alt={`Additional ${index}`} className={styles['additional-image']} />
                            ))}
                        </div>
                        <img src={mainImage} alt={product.title} className={styles['main-image']} />
                    </div>
                </div>
                <div className={styles['product-details']}>
                    <h1 className={styles['product-title']}>{product.title}</h1>
                    <p className={styles['product-category']}>{product.category.name}</p>
                    <p className={styles['product-description']}>{product.description}</p>
                    <div className={styles['price-container']}>
                        <p className={styles['product-price']}>
                            {product.price} <span className={styles['hryvnia-sign']}>₴</span>
                        </p>
                        <button className={styles['add-to-cart-button']} onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
