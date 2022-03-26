// ** firebase sdk is used to connect to the database with strict security rules
// ** and should be used for the frontend of the application

// import { getAnalytics } from "@firebase/analytics";
import { getAuth } from "@firebase/auth";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { firebaseConfig } from "../../config/configs";

const app: FirebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const firebase = {
    auth: getAuth(app),
    db: getFirestore(app),
};
