// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    creationAt: string;
    updatedAt: string;
    category: Category;
}

interface Category {
    id: number;
    name: string;
    image: string;
    creationAt: string;
    updatedAt: string;
}
