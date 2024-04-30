import React from 'react';

import { SocialIcon } from '@/components/socialIcon/SocialIcon.component.tsx';
import { MAlink } from '@/constants/social-links.ts';

import styles from './footer.module.css';

export const FooterComponent = () => (
    <footer className={styles['footer']}>
        <hr className={styles['line']} />
        <div className={styles['footer-content']}>
            <ul className={styles['social-links']}>
                <SocialIcon icon={''} link={''}></SocialIcon>
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
