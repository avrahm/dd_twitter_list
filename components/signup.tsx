import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';



const SignUp: NextPage = () => {

    async function getTwitterAuth() {

        const response = await fetch('https://us-central1-dd-twitter-list.cloudfunctions.net/app/api/user/connect', {
            method: 'POST'
        });
        const data = await response.json();
        console.log(data);

    }


    return (
        <div className={styles.container}>


            <h1 className="text-3xl font-bold underline">
                Connect Your Twitter
            </h1>

            <p className="text-xl">
                Sign up to get started.
            </p>

            <button onClick={getTwitterAuth} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sign Up
            </button>

        </div>
    )
}

export default SignUp
