export interface User {
    uid: string;
    twitterData?: {
        uid: string | null;
        displayName: string | null;
        photoURL: string | null;
        email: string | null;
    };
    token?: string;
    secret?: string;
    firebaseToken?: string;
}
