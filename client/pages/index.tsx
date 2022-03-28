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

            <h1 className="text-3xl font-bold underline pb-5">Welcome to DD Twitter List</h1>

            <SignUpView />
            <div className={styles.container}>
                <ListViewController />
            </div>
        </div>
    );
};

export default Home;
