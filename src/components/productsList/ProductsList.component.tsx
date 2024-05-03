import { ProductCard } from '@/components/productCard/ProductCard.component.tsx';
import type { Product } from '@/interfaces/Product.ts';

import styles from './productsList.module.css';

export interface ProductsListComponentProps {
    products: Product[];
}

export const ProductsListComponent: React.FC<ProductsListComponentProps> = ({ products }) => (
    <div className={styles['products-list']}>
        {products.map((product, index) => (
            <ProductCard key={index} product={product} />
        ))}
    </div>
);
