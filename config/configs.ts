export const configs = {
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL as string,
    TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY as string,
    TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET as string,
    TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN as string,
    TWITTER_CALLBACK_URL: process.env.TWITTER_CALLBACK_URL as string,
    TWITTER_REQUEST_TOKEN_URL: "https://api.twitter.com/oauth/request_token",
    TWITTER_ACCESS_TOKEN_URL: "https://api.twitter.com/oauth/access_token",
    TWITTER_AUTHORIZE_URL: "https://api.twitter.com/oauth/authorize",
    TWITTER_API_URL: "https://api.twitter.com",
    TWITTER_API_VERSION: "",
    API_URL: process.env.FIREBASE_API_URL as string,
};

export const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};
