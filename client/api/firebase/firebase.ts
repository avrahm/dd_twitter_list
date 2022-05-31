// ** firebase sdk is used to connect to the database with strict security rules
// ** and should be used for the frontend of the application

import { getAuth } from "@firebase/auth";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { firebaseConfig } from "../../config/configs";

const app: FirebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
let analytics;
// if (app.name && typeof window !== "undefined") {
//     analytics = getAnalytics(app);
// }

export { db, auth, analytics };
