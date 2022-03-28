import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Callback: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Callback</title>
            </Head>

            <h1 className="text-3xl font-bold underline">
                Callback
            </h1>

        </div>
    )
}

export default Callback
