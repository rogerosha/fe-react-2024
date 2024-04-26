import React from 'react';

import styles from './footer.module.css';
const MAlink = 'https://www.mastersacademy.education/frontend-for-beginners-it';

export const FooterComponent = () => (
    <footer className={styles['footer']}>
        <hr className={styles['line']} />
        <div className={styles['footer-content']}>
            <ul className={styles['social-links']}>
                <a href="https://www.facebook.com">
                    <img className={styles['fb-logo']} src="./facebook.svg" alt="fb"></img>
                </a>
                <a href="https://www.linkedin.com/">
                    <img className={styles['li-logo']} src="./linkedin.svg" alt="li"></img>
                </a>
                <a href="https://www.instagram.com">
                    <img className={styles['ig-logo']} src="./instagram.svg" alt="ig"></img>
                </a>
            </ul>
            <div className={styles['footer-text']}>
                <p>
                    Made with 💗 on course{' '}
                    <a href={MAlink} className={styles['link']}>
                        &lsquo;Intro to React&rsquo;
                    </a>{' '}
                </p>
                <p>
                    <a href={MAlink} className={styles['link']}>
                        from Masters Academy in 2024,
                    </a>
                </p>
                <p>by Katya Sharova</p>
            </div>
        </div>
    </footer>
);
