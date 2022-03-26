/* eslint-disable require-jsdoc */
import { NextFunction, Request, Response } from "express";
import { admin } from "../service/firebase";

interface RequestUser extends Request {
    user?: string;
}

class FirebaseAuthToken {
    async decodeToken(req: RequestUser, res: Response, next: NextFunction): Promise<unknown> {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            return res.status(401).send("No token provided");
        }
        try {
            const decodeValue = await admin.auth().verifyIdToken(token);
            if (decodeValue) {
                req.user = decodeValue.uid;
                return next();
            } else {
                return res.status(401).send("Invalid token");
            }
        } catch (error) {
            let errorMessage = "Internal Error";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            return res.status(500).send({ errorMessage });
        }
    }
}

export default FirebaseAuthToken;
