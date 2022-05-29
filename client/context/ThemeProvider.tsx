import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const defaultState = {
    darkMode: false,
    setDarkMode: () => {},
    toggleMode: () => {},
};

interface ThemeContext {
    darkMode: Boolean;
    toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContext>(defaultState);

export type Props = {
    children: ReactNode;
    darkMode: boolean;
};

const ThemeProvider = (props: Props): JSX.Element | any => {
    const { children } = props;

    const [darkMode, setDarkMode] = useState<boolean>(false);
    const toggleMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("darkMode");
    };

    useEffect(() => {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setDarkMode(prefersDark);
    }, []);

    return (
        <ThemeContext.Provider
            value={{
                darkMode,
                toggleMode,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
