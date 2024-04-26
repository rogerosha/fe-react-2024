import React from 'react';

import styles from './header.module.css';

export const HeaderComponent = () => (
    <header className={styles['header']}>
        <div className={styles['logo']}>
            <img className={styles['MA-logo']} src="./MAlogo.svg" alt="MAlogo"></img>
        </div>
        <div className={styles['right-menu']}>
            <img className={styles['cart']} src="./cart.svg" alt="cart"></img>
            <img className={styles['menu']} src="./menu.svg" alt="menu"></img>
        </div>
    </header>
);
