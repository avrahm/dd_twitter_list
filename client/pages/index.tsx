import type { NextPage } from "next";
import Head from "next/head";
import { ListViewController } from "../components/controllers/listViewController";
import { SignUpView } from "../components/views/signupView";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>DD Twitter List</title>
            </Head>

            <h1 className="text-3xl font-bold underline py-5 text-center">
                Welcome to DD Twitter List
            </h1>

            <div className={styles.container}>
                <SignUpView />
                <ListViewController />
            </div>
        </div>
    );
};

export default Home;
