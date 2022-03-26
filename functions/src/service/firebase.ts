// ** Using firebase admin allows for additional admin functionally
// ** and should be used for the backend of the application

import * as admin from "firebase-admin";
import { configs } from "../config/configs";
const serviceAccount = "./permissions.json";

admin.initializeApp({
    // service account allows to connect to the database
    credential: admin.credential.cert(serviceAccount),
    databaseURL: configs.FIREBASE_DATABASE_URL,
});

const db: FirebaseFirestore.Firestore = admin.firestore();
db.settings({ timestampsInSnapshots: true });

export { db, admin };
