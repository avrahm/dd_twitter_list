import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore/lite";
import { User } from "../../config/Interfaces";
import { firebase } from "./firebase";

export const getUser = async (uid: string) => {
    return await getDoc(doc(firebase.db, `users/${uid}`)).then((user) => {
        return user.data();
    });
};

export const refreshToken = async (user: User) => {
    return await firebase.auth.currentUser?.getIdToken(true).then((token) => {
        updateDoc(doc(firebase.db, `users/${user.uid}`), {
            firebaseToken: token,
        });
    });
};

export const createUser = async (user: User) => {
    try {
        return await setDoc(doc(firebase.db, "users", user.uid), user);
    } catch (error) {
        console.log(error);
    }
};

export const signout = () => {
    return firebase.auth.signOut();
};
