import axios from "axios";
import { Response } from "express";
import { configs } from "../config/configs";
import consumer from "../helpers/twitterHelper";

type Request = {
    body: {
        twitterId: string;
        listId: string;
        oauthToken: string;
        oauthTokenSecret: string;
        action: string;
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
        list_id: req.params.listId || "1505738404935446529",
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
    const url = configs.TWITTER_API_URL + `/1.1/lists/${action}.json`;
    const token = req.body.oauthToken;
    const tokenSecret = req.body.oauthTokenSecret;
    const body = {
        list_id: req.body.listId,
        screen_name: req.body.twitterId,
    };
    return useConsumer.post(
        url,
        token,
        tokenSecret,
        body,
        "application/json",
        (error, data, response) => {
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
        }
    );
};

export const manageMember = async (req: Request, res: Response): Promise<unknown> => {
    const useConsumer = consumer;
    const { action } = req.body;
    const url = configs.TWITTER_API_URL + `/1.1/lists/members/${action}.json`;
    const token = configs.TWITTER_OWNER_TOKEN;
    const tokenSecret = configs.TWITTER_OWNER_SECRET;
    const body = {
        list_id: req.body.listId,
        user_id: req.body.twitterId,
    };
    return useConsumer.post(
        url,
        token,
        tokenSecret,
        body,
        "application/json",
        (error, data, response) => {
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
        }
    );
};
