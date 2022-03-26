import { signInWithPopup, TwitterAuthProvider } from "@firebase/auth";
import { User } from "../../config/Interfaces";
import { firebase } from "./firebase";
import { createUser } from "./user";

export const twitterSignIn = () => {
    const provider = new TwitterAuthProvider();

    const fbAuth = firebase.auth;
    signInWithPopup(fbAuth, provider)
        .then(async (result) => {
            // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
            // You can use these server side with your app's credentials to access the Twitter API.
            const credential = TwitterAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const secret = credential?.secret;

            // The signed-in user info.
            const uid = result.user.uid;
            const twitterData = result.user.providerData[0];
            const firebaseToken = await result.user.getIdToken();

            const user: User = {
                uid,
                twitterData,
                token,
                secret,
                firebaseToken,
            };

            return createUser(user);
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = TwitterAuthProvider.credentialFromError(error);

            console.log(errorCode, errorMessage, email, credential);
        });
};
