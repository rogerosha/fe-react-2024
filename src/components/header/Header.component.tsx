import type { FC } from 'react';
import React, { useContext } from 'react';

import { ThemeContext } from '@/contexts/ThemeContext.ts';
import type { PageRoute } from '@/interfaces/Routing.ts';

import CartIcon from '../../assets/cart.svg?react';
import MoonIcon from '../../assets/moon.svg?react';
import SignUp from '../../assets/signup.svg?react';
import SunIcon from '../../assets/sun.svg?react';

import styles from './header.module.css';

export interface HeaderProps {
    page: PageRoute;
    onPageClick: (page: PageRoute) => void;
    selectedProducts: number[];
}

export const HeaderComponent: FC<HeaderProps> = ({ page, onPageClick, selectedProducts }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const isDarkMode = theme === 'dark';

    return (
        <header className={styles['header']}>
            <div className={styles['header-wrapper']}>
                <div className={styles['left-part']}>
                    <div className={styles['logo']}>
                        <img className={styles['MA-logo']} src="./MAlogo.svg" alt="MAlogo"></img>
                    </div>
                    <div className={styles['theme-changer']}>
                        <button onClick={toggleTheme} className={styles['day-night']}>
                            <SunIcon
                                className={styles['day-mode']}
                                style={{ color: isDarkMode ? 'var(--icons-semi)' : 'var(--icons-light)' }}
                            ></SunIcon>
                        </button>
                        <div className={styles['divider']}></div>
                        <button onClick={toggleTheme} className={styles['day-night']}>
                            <MoonIcon
                                className={styles['night-mode']}
                                style={{ color: isDarkMode ? 'var(--icons-light)' : 'var(--icons-semi)' }}
                            ></MoonIcon>
                        </button>
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
                        <CartIcon className={styles['cart']} />
                        {selectedProducts.length}
                        <img className={styles['menu']} src="./menu.svg" alt="menu"></img>
                        <div className={styles['buttons']}>
                            <button className={styles['button-logout']}>
                                <img className={styles['logout']} src="./login.svg" alt="Log out"></img> Log out
                            </button>
                            <button className={styles['button-signup']}>
                                <SignUp className={styles['signup']} /> Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
