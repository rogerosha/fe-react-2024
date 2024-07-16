import { createContext } from 'react';

export const CartContext = createContext({
    selectedProducts: [] as number[],
    addProductToCart: (productId: number) => {},
    removeProductFromCart: (productId: number) => {},
});
