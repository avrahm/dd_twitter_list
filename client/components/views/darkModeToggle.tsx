import Image from "next/image";
import { useTheme } from "../../context/ThemeProvider";
import styles from "../../styles/Home.module.css";

export const DarkModeToggle = () => {
    const { darkMode, toggleMode } = useTheme();

    return (
        <div className="p-4 flex items-center justify-center">
            <button className={`${darkMode ? styles.darkMode : styles.lightMode}`} onClick={() => toggleMode()}>
                {darkMode ? (
                    <div className="p-4 flex items-center justify-center">
                        <Image src="/lightMode.png" width="25px" height="25px" alt="Dark Mode" />
                        <span className="px-3">Switch to Light Mode</span>
                    </div>
                ) : (
                    <div className="p-4 flex items-center justify-center">
                        <Image src="/darkMode.png" width="25px" height="25px" alt="Dark Mode" />
                        <span className="px-3">Switch to Dark Mode</span>
                    </div>
                )}
            </button>
        </div>
    );
};
