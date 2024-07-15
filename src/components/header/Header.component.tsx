import type { FC } from 'react';
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ThemeContext } from '@/contexts/ThemeContext.tsx';
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
    const location = useLocation();

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
                            />
                        </button>
                        <div className={styles['divider']}></div>
                        <button onClick={toggleTheme} className={styles['day-night']}>
                            <MoonIcon
                                className={styles['night-mode']}
                                style={{ color: isDarkMode ? 'var(--icons-light)' : 'var(--icons-semi)' }}
                            />
                        </button>
                    </div>
                </div>
                <div className={styles['right-part']}>
                    <div className={styles['navigation']}>
                        <Link
                            to="/about"
                            className={styles['navigation-link']}
                            style={{ fontWeight: location.pathname === '/about' ? 'bold' : 'initial' }}
                        >
                            About
                        </Link>
                        <Link
                            to="/products"
                            className={styles['navigation-link']}
                            style={{ fontWeight: location.pathname === '/products' ? 'bold' : 'initial' }}
                        >
                            Products
                        </Link>
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
