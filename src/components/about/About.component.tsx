import styles from './about.module.css';
const telegramLink = 'https://www.t.me/rogerosha';
const githubLink = 'https://www.github.com/rogerosha';
const MAlink = 'https://www.mastersacademy.education/frontend-for-beginners-it';

export const AboutComponent = () => {
    const aboutDescriptionClass = styles['about-description'];
    return (
        <div className={styles['about-container']}>
            <img className={styles['about-image']} src="./about.png" alt="Me" />
            <div className={styles['about-text']}>
                <h2 className={styles['about-title']}>About me</h2>
                <p className={aboutDescriptionClass}>
                    Hi! My name is Katya and I&apos;m a Junior Frontend Developer. I am already familiar with main Web Technologies like
                    React, HTML, CSS, JavaScript and Git version control system.
                </p>
                <p className={aboutDescriptionClass}>
                    This page was developed during the course{' '}
                    <a href={MAlink} className={styles['link']}>
                        &lsquo;Intro to React&rsquo;
                    </a>{' '}
                    from Masters Academy in 2024.
                </p>
                <p className={aboutDescriptionClass}>
                    This is a social project from MOCG company where I got an opportunity to work with Frontend mentors and to create my own
                    small project for the portfolio.
                </p>
                <p className={aboutDescriptionClass}>
                    You can contact me via{' '}
                    <a href={telegramLink} className={styles['link']}>
                        telegram
                    </a>{' '}
                    and/or check out my{' '}
                    <a href={githubLink} className={styles['link']}>
                        GitHub
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};
