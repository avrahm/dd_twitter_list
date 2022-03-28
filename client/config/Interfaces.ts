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

export interface List {
    id_str: string;
    name: string;
    description: string;
    member_count: number;
    subscriber_count: number;
}

export interface Member {
    screen_name: string;
    id_str: string;
    profile_image_url_https: string;
    name: string;
    description: string;
    followers_count: number;
    friends_count: number;
}
