import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const ThemeContext = createContext({
    theme: 'light' as 'light' | 'dark',
    toggleTheme: () => {},
});

interface ThemeComponentProps {
    children: ReactNode;
}

export const ThemeComponent: React.FC<ThemeComponentProps> = ({ children }) => {
    const getInitialTheme = (): 'light' | 'dark' => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme as 'light' | 'dark';
        }
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

    useEffect(() => {
        const bodyClass = theme === 'dark' ? 'dark-mode' : 'light-mode';
        document.body.classList.add(bodyClass);
        document.body.classList.remove(theme === 'dark' ? 'light-mode' : 'dark-mode');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((previousTheme) => (previousTheme === 'light' ? 'dark' : 'light'));
    };

    const contextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

    return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('Theme context is undefined!');
    }
    return context;
};
