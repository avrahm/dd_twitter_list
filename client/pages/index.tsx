import type { NextPage } from "next";
import Head from "next/head";
import { VscGithub } from "react-icons/vsc";
import { ListViewController } from "../components/controllers/listViewController";
import { DarkModeToggle } from "../components/views/darkModeToggle";
import { SignUpView } from "../components/views/signupView";
import { useTheme } from "../context/ThemeProvider";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    const { darkMode } = useTheme();

    return (
        <div className={`${styles.container} ${darkMode ? styles.darkMode : styles.lightMode} w-[100vh] sm:w-full`}>
            <Head>
                <title>DD Twitter List</title>
            </Head>

            <div className={`flex flex-row items-center`}>
                <h1 className="text-3xl font-bold underline p-2 text-center">DD Twitter List</h1>

                <DarkModeToggle />
            </div>

            <div className={`${styles.container} ${darkMode ? styles.darkMode : styles.lightMode}`}>
                <SignUpView />
                <ListViewController />
            </div>

            <div className="flex flex-col  items-center py-10">
                <span>
                    Built by <a href="https://twitter.com/avrahm">@avrahm</a>
                </span>
                <span className="flex flex-row items-center">
                    <a href="https://github.com/avrahm/dd_twitter_list" className="pr-2 py-1">
                        View on GitHub
                    </a>
                    <VscGithub />
                </span>
            </div>
        </div>
    );
};

export default Home;
