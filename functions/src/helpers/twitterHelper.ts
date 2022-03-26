import oauth from "oauth";
import { configs } from "../config/configs";

const consumer = new oauth.OAuth(
    configs.TWITTER_REQUEST_TOKEN_URL,
    configs.TWITTER_ACCESS_TOKEN_URL,
    configs.TWITTER_CONSUMER_KEY,
    configs.TWITTER_CONSUMER_SECRET,
    "1.0A",
    configs.TWITTER_CALLBACK_URL,
    "HMAC-SHA1"
);

export default consumer;
