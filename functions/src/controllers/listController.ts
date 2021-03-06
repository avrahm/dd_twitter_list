import axios from "axios";
import { Response } from "express";
import { configs } from "../config/configs";
import { getTokens, getUserDoc } from "../helpers/firebaseHelper";
import consumer from "../helpers/twitterHelper";

type Request = {
    body: {
        twitterId: string;
        followId: string;
        listId: string;
        userId: string;
        oauthToken: string;
        oauthTokenSecret: string;
        action: string;
        listOwnerId: string;
    };
    user?: string;
    params: {
        userId?: string;
        listId?: string;
    };
};

export const getLists = async (req: Request, res: Response): Promise<unknown> => {
    const url = configs.TWITTER_API_URL + "/1.1/lists/list.json";
    const params = {
        screen_name: req.params.userId || "avrahm",
    };
    const headers = {
        Authorization: "Bearer " + configs.TWITTER_BEARER_TOKEN,
    };
    try {
        const response = await axios.get(url, {
            withCredentials: true,
            params,
            headers,
        });
        return res.status(200).send({
            message: response.statusText,
            data: response.data,
        });
    } catch (error) {
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(500).send({ errorMessage });
    }
};

export const getListFollowers = async (req: Request, res: Response): Promise<unknown> => {
    const url = configs.TWITTER_API_URL + "/1.1/lists/subscribers.json";
    const params = {
        list_id: req.params.listId || configs.TWITTER_DD_LIST_ID,
        skip_status: true,
        count: 5000,
    };
    const headers = {
        Authorization: "Bearer " + configs.TWITTER_BEARER_TOKEN,
    };
    try {
        const response = await axios.get(url, {
            withCredentials: true,
            params,
            headers,
        });
        return res.status(200).send({
            message: response.statusText,
            data: response.data,
        });
    } catch (error) {
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(500).send({ errorMessage });
    }
};

export const getListMembers = async (req: Request, res: Response): Promise<unknown> => {
    const url = configs.TWITTER_API_URL + "/1.1/lists/members.json";
    const params = {
        list_id: req.params.listId || configs.TWITTER_DD_LIST_ID,
        skip_status: true,
        count: 5000,
    };
    const headers = {
        Authorization: "Bearer " + configs.TWITTER_BEARER_TOKEN,
    };
    try {
        const response = await axios.get(url, {
            withCredentials: true,
            params,
            headers,
        });
        return res.status(200).send({
            message: response.statusText,
            data: response.data,
        });
    } catch (error) {
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(500).send({ errorMessage });
    }
};

export const manageList = async (req: Request, res: Response): Promise<unknown> => {
    const useConsumer = consumer;
    const { action } = req.body;
    const url = configs.TWITTER_API_URL + `/1.1/lists/subscribers/${action}.json`;

    // if there is no user in firebase, return error
    if ((await getUserDoc(req.body.userId)).empty) {
        return res.status(404).send({
            error: "User not found",
        });
    }

    const body = {
        list_id: req.body.listId,
        screen_name: req.body.userId,
    };

    // get token and secret from firebase user document
    const { token, secret } = await getTokens(req.body.userId);

    return useConsumer.post(url, token, secret, body, "application/json", (error, data, response) => {
        if (error) {
            const errorCode = error.statusCode || 500;
            return res.status(errorCode).send({
                error: error.data,
            });
        }
        return res.status(200).send({
            message: response?.statusCode,
            data: response?.statusMessage,
        });
    });
};

export const manageMember = async (req: Request, res: Response): Promise<unknown> => {
    const useConsumer = consumer;
    const { action } = req.body;
    const url = configs.TWITTER_API_URL + `/1.1/lists/members/${action}.json`;

    const body = {
        list_id: req.body.listId,
        user_id: req.body.userId,
    };
    // get token and secret from firebase user document
    const { token, secret } = await getTokens(req.body.listOwnerId);

    return useConsumer.post(url, token, secret, body, "application/json", (error, data, response) => {
        if (error) {
            const errorCode = error.statusCode || 500;
            return res.status(errorCode).send({
                error: error.data,
            });
        }
        return res.status(200).send({
            message: response?.statusCode,
            data: response?.statusMessage,
        });
    });
};

export const manageFollow = async (req: Request, res: Response): Promise<unknown> => {
    const useConsumer = consumer;
    const { action } = req.body;
    const url = configs.TWITTER_API_URL + `/1.1/friendships/${action}.json`;

    // if there is no user in firebase, return error
    if ((await getUserDoc(req.body.userId)).empty) {
        return res.status(404).send({
            error: "User not found",
        });
    }

    // get token and secret from firebase user document
    const { token, secret } = await getTokens(req.body.userId);

    const body = {
        user_id: req.body.followId,
    };
    return useConsumer.post(url, token, secret, body, "application/json", (error, data, response) => {
        if (error) {
            const errorCode = error.statusCode || 500;
            return res.status(errorCode).send({
                error: error.data,
            });
        }
        return res.status(200).send({
            message: response?.statusCode,
            data: response?.statusMessage,
        });
    });
};
