import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://ma-backend-api.mocintra.com/api/v1/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data.product);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>${product.price}</p>
        </div>
    );
};

export default ProductPage;
