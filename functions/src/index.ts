import cors from "cors";
import express from "express";
import * as functions from "firebase-functions";
import { listController } from "./controllers";
import FirebaseAuthToken from "./middleware/firebaseAuthToken";

const app = express();
const router = express.Router();
const firebaseAuthToken = new FirebaseAuthToken().decodeToken;

// Automatically allow cross-origin requests.
// Allow any domain that requests a resource from my server
app.use(cors({ origin: true }));
app.use("/api", router);

// Routes

// get a user's lists
router.get("/list", listController.getLists);

// get a list followers
router.get("/list/followers", listController.getListFollowers);

// get a list members
router.get("/list/members", listController.getListMembers);

// allow a user to follow/unfollow the list
router.post("/list", firebaseAuthToken, listController.manageList);

// allow a user to add/remove themselves from the list
router.post("/list/member/", firebaseAuthToken, listController.manageMember);

// allow a user to follow/unfollow other users
router.post("/friend/", firebaseAuthToken, listController.manageFollow);

// Export the api to Firebase Cloud Functions
exports.app = functions.https.onRequest(app);
