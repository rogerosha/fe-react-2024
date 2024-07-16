import React from 'react';

import styles from './socialIcon.module.css';

export interface Props {
    icon: string;
    link: string;
}

export const SocialIcon = ({ icon, link }: Props) => (
    <a href={link}>
        <img className={styles['social-icon']} src={icon} alt="icon"></img>
    </a>
);
