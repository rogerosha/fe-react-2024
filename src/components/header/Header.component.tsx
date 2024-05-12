import type { FC } from 'react';
import React from 'react';

import type { PageRoute } from '@/interfaces/Routing.ts';

import styles from './header.module.css';

export interface HeaderProps {
    page: PageRoute;
    onPageClick: (page: PageRoute) => void;
    selectedProducts: number[];
}

export const HeaderComponent: FC<HeaderProps> = ({ page, onPageClick, selectedProducts }) => (
    <header className={styles['header']}>
        <div className={styles['header-wrapper']}>
            <div className={styles['left-part']}>
                <div className={styles['logo']}>
                    <img className={styles['MA-logo']} src="./MAlogo.svg" alt="MAlogo"></img>
                </div>
                <div className={styles['day-night']}>
                    <img className={styles['day-mode']} src="./daymode.png" alt="Sun" />
                    <div className={styles['divider']}></div>
                    <img className={styles['night-mode']} src="./nightmode.png" alt="Moon" />
                </div>
            </div>
            <div className={styles['right-part']}>
                <div className={styles['navigation']}>
                    <span
                        className={styles['navigation-link']}
                        style={{ fontWeight: page === 'about' ? 'bold' : 'initial' }}
                        onClick={() => onPageClick('about')}
                    >
                        About
                    </span>
                    <span
                        className={styles['navigation-link']}
                        style={{ fontWeight: page === 'products' ? 'bold' : 'initial' }}
                        onClick={() => onPageClick('products')}
                    >
                        Products
                    </span>
                </div>
                <div className={styles['right-menu']}>
                    <img className={styles['cart']} src="./cart.svg" alt="cart"></img>
                    {selectedProducts.length}
                    <img className={styles['menu']} src="./menu.svg" alt="menu"></img>
                </div>
                <div className={styles['buttons']}>
                    <button className={styles['button-login']}>
                        <img className={styles['login']} src="./login.png" alt="Login"></img> Login
                    </button>
                    <button className={styles['button-signup']}>
                        <img className={styles['signup']} src="./signup.png" alt="Sign Up"></img> Sign Up
                    </button>
                </div>
            </div>
        </div>
    </header>
);
