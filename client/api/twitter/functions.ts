import axios from "axios";
import { configs } from "../../config/configs";
import { List, User } from "../../config/Interfaces";

export const getMainList = async (userId: string = "avrahm") => {
    const lists = await getLists(userId);
    if (!lists) return null;
    const list = lists.filter((list: { id_str: string }) => list.id_str == configs.TWITTER_DD_LIST_ID);
    if (!list) return null;
    return list;
};

const getLists = async (twitterId: string) => {
    const url = configs.API_URL + "/list";
    try {
        const response = await axios.get(url, {
            params: { userId: twitterId },
        });
        if (response.status === 200) return response.data.data;
        return null;
    } catch (error) {
        console.error(error);
    }
};

export const getListOfUsers = async (type: string, listId: string | undefined = configs.TWITTER_DD_LIST_ID) => {
    const url = configs.API_URL + `/list/${type}`;

    try {
        const response = await axios.get(url, {
            params: { listId: listId },
        });
        if (response.status === 200) return response.data.data;
        return null;
    } catch (error) {
        console.error(error);
    }
};

export const manageList = async (user: User, listId: string, action: string) => {
    const url = configs.API_URL + "/list";
    const data = {
        listId: listId,
        userId: user.twitterData?.uid,
        action: action,
    };
    const headers = {
        Authorization: "Bearer " + user.firebaseToken,
    };
    try {
        const response = await axios.post(url, data, { headers });
        if (response.status !== 200) return null;
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
};

export const manageMember = async (user: User, list: List, action: string) => {
    const url = configs.API_URL + `/list/member`;
    const data = {
        listId: list.id_str,
        listOwnerId: list.user.id_str,
        userId: user.twitterData?.uid,
        action: action,
    };
    const headers = {
        Authorization: "Bearer " + user.firebaseToken,
    };
    try {
        const response = await axios.post(url, data, { headers });
        if (response.status !== 200) return null;
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
};

export const manageFollow = async (user: User, followId?: string, action?: string) => {
    const url = configs.API_URL + "/friend";
    const data = {
        followId: followId,
        userId: user.twitterData?.uid,
        action: action,
    };
    const headers = {
        Authorization: "Bearer " + user.firebaseToken,
    };
    try {
        const response = await axios.post(url, data, { headers });
        if (response.status !== 200) return null;
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
};
