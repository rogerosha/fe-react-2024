import type { FC } from 'react';
import React from 'react';

import type { Page } from '@/App.tsx';

import styles from './header.module.css';

export interface HeaderProps {
    page: Page;
    onPageClick: (page: Page) => void;
}

export const HeaderComponent: FC<HeaderProps> = ({ page, onPageClick }) => (
    <header className={styles['header']}>
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
                <a
                    className={styles['navigation-link']}
                    style={{ fontWeight: page === 'about' ? 'bold' : 'initial' }}
                    onClick={() => onPageClick('about')}
                >
                    About
                </a>
                <a
                    className={styles['navigation-link']}
                    style={{ fontWeight: page === 'products' ? 'bold' : 'initial' }}
                    onClick={() => onPageClick('products')}
                >
                    Products
                </a>
            </div>
            <div className={styles['right-menu']}>
                <img className={styles['cart']} src="./cart.svg" alt="cart"></img>
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
    </header>
);
