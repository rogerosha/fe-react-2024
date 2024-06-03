import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface ThemeContextProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

interface ThemeComponentProps {
    children: ReactNode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeComponent: React.FC<ThemeComponentProps> = ({ children }) => {
    const getInitialTheme = (): boolean => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    };

    const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialTheme);

    useEffect(() => {
        const bodyClass = isDarkMode ? 'dark-mode' : 'light-mode';
        document.body.classList.add(bodyClass);
        document.body.classList.remove(isDarkMode ? 'light-mode' : 'dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode((previousMode) => !previousMode);
    };

    const contextValue = useMemo(() => ({ isDarkMode, toggleTheme }), [isDarkMode]);

    return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('Theme context is undefined!');
    }
    return context;
};
