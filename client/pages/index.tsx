import type { NextPage } from "next";
import Head from "next/head";
import { ListViewController } from "../components/controllers/listViewController";
import { DarkModeToggle } from "../components/views/darkModeToggle";
import { SignUpView } from "../components/views/signupView";
import { useTheme } from "../context/ThemeProvider";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    const { darkMode } = useTheme();

    return (
        <div className={`${styles.container} ${darkMode ? styles.darkMode : styles.lightMode}`}>
            <Head>
                <title>DD Twitter List</title>
            </Head>

            <div className="flex flex-row items-center">
                <h1 className="text-3xl font-bold underline py-5 text-center">DD Twitter List</h1>

                <DarkModeToggle />
            </div>

            <div className={`${styles.container} ${darkMode ? styles.darkMode : styles.lightMode}`}>
                <SignUpView />
                <ListViewController />
            </div>
        </div>
    );
};

export default Home;
