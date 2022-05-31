import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore/lite";
import { User } from "../../config/Interfaces";
import { auth, db } from "./firebase";

export const getUser = async (uid: string) => {
    return await getDoc(doc(db, `users/${uid}`)).then((user) => {
        return user.data();
    });
};

export const refreshToken = async (user: User) => {
    return await auth.currentUser?.getIdToken(true).then((token) => {
        updateDoc(doc(db, `users/${user.uid}`), {
            firebaseToken: token,
        });
    });
};

export const createUser = async (user: User) => {
    try {
        return await setDoc(doc(db, "users", user.uid), user);
    } catch (error) {
        console.log(error);
    }
};

export const saveFollows = async (user: User, listId: string, errors: string[], successes: string[]) => {
    try {
        return await setDoc(doc(db, `users/${user.uid}/follows/${listId}`), {
            listId,
            errors,
            successes,
            lastUpdated: new Date(),
        });
    } catch (error) {
        console.log(error);
    }
};

export const getUserListFollows = async (user: User, listId: string) => {
    try {
        return await getDoc(doc(db, `users/${user.uid}/follows/${listId}`)).then((follows) => {
            return follows.data();
        });
    } catch (error) {
        console.log(error);
    }
};

export const signout = () => {
    return auth.signOut();
};
