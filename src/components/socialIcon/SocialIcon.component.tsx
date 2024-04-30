import React from 'react';

import { facebookLink, instagramLink, linkedinLink } from '@/constants/social-links.ts';

import styles from './socialIcon.module.css';

export interface Props {
    icon: string;
    link: string;
}
export const SocialIcon = ({ icon, link }: Props) => (
    <>
        <a href={facebookLink}>
            <img className={styles['fb-logo']} src="./facebook.svg" alt="fb"></img>
        </a>
        <a href={linkedinLink}>
            <img className={styles['li-logo']} src="./linkedin.svg" alt="li"></img>
        </a>
        <a href={instagramLink}>
            <img className={styles['ig-logo']} src="./instagram.svg" alt="ig"></img>
        </a>
    </>
);
