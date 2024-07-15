import React from 'react';
import { Link } from 'react-router-dom';

import type { PageRoute } from '@/interfaces/Routing.ts';

export interface NotFoundPageProps {
    page: PageRoute;
    onPageClick: (page: PageRoute) => void;
    selectedProducts: number[];
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ page, onPageClick, selectedProducts }) => (
    <div>
        <h2>Page Not Found</h2>
        <p>This page does not exist</p>
        <Link to="/about" onClick={() => onPageClick('about')}>
            Go to About Page
        </Link>
    </div>
);

export default NotFoundPage;
