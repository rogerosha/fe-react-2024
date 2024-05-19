import { ProductCard } from '@/components/productCard/ProductCard.component.tsx';
import type { Product } from '@/interfaces/Product.ts';

import styles from './productsList.module.css';

export interface ProductsListComponentProps {
    products: Product[];
    selectedProducts: number[];
    setSelectedProducts: (products: number[]) => void;
}

export const ProductsListComponent: React.FC<ProductsListComponentProps> = ({ products, selectedProducts, setSelectedProducts }) => (
    <div className={styles['products-list']}>
        {products.map((product) => (
            <ProductCard
                onCartClick={() => {
                    if (selectedProducts.includes(product.id)) {
                        setSelectedProducts(selectedProducts.filter((id) => id !== product.id));
                        return;
                    }

                    setSelectedProducts([...selectedProducts, product.id]);
                }}
                isProductInCart={selectedProducts.includes(product.id)}
                key={product.id}
                product={product}
            />
        ))}
    </div>
);
