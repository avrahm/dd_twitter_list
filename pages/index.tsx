import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>DD Twitter List</title>

      </Head>


      <h1 className="text-3xl font-bold underline">
        Welcome to DD Twitter List
      </h1>

    </div>
  )
}

export default Home
