import type { NextPage } from "next";
import Head from "next/head";
import { ListDetailController } from "../components/controllers/listDetailController";
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
            <ListDetailController />
        </div>
    );
};

export default Home;
