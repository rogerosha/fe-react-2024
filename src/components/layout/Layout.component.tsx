import React from 'react';
import { Outlet } from 'react-router-dom';

import { FooterComponent } from '@/components/footer/Footer.component.tsx';
import { HeaderComponent } from '@/components/header/Header.component.tsx';
import type { PageRoute } from '@/interfaces/Routing.ts';

interface LayoutComponentProps {
    page: PageRoute;
    onPageClick: (newPage: PageRoute) => void;
    selectedProducts: number[];
}

const LayoutComponent: React.FC<LayoutComponentProps> = ({ page, onPageClick, selectedProducts }) => (
    <>
        <HeaderComponent page={page} onPageClick={onPageClick} selectedProducts={selectedProducts} />
        <Outlet />
        <FooterComponent />
    </>
);

export default LayoutComponent;
