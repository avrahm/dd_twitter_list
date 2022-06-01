import { db } from "../service/firebase";

export const getUserDoc = async (userId: string): Promise<FirebaseFirestore.DocumentData> => {
    const doc = await db.collection("users").where("twitterData.uid", "==", userId).get();
    return doc;
};

export const getTokens = async (userId: string): Promise<FirebaseFirestore.DocumentData> => {
    const userFromFirebase = await getUserDoc(userId);
    const token = userFromFirebase.docs[0].data().token;
    const secret = userFromFirebase.docs[0].data().secret;
    return { token, secret };
};
