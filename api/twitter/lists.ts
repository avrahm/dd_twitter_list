import axios from "axios";
import { configs } from "../../config/configs";
import { User } from "../../config/Interfaces";

export const isUserFollowingList = async (user: User) => {
    const listOfFollowers = await getListFollowers(user);
    if (!listOfFollowers || listOfFollowers == undefined || listOfFollowers.length == 0) {
        return false;
    }
    const { users } = listOfFollowers;
    if (users.length == 0) return false;
    const isFollowing = users.some(
        (follower: { id_str: string }) => follower.id_str == user.twitterData?.uid
    );
    return isFollowing;
};

export const getMainList = async (userId: string = "avrahm") => {
    const lists = await getLists(userId);
    if (!lists) return null;
    const list = lists.filter(
        (list: { id_str: string }) => list.id_str == process.env.TWITTER_DD_LIST_ID
    );
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
        console.log(error);
    }
};

const getListFollowers = async (
    user: User,
    listId: string | undefined = process.env.TWITTER_DD_LIST_ID
) => {
    const url = configs.API_URL + "/list/followers";
    const headers = {
        Authorization: "Bearer " + user.firebaseToken,
    };
    try {
        const response = await axios.get(url, {
            headers,
            params: { listId: listId },
        });
        if (response.status === 200) return response.data.data;
        return null;
    } catch (error) {
        console.log(error);
    }
};

export const manageList = async (user: User, listId: string, action: string) => {
    const url = configs.API_URL + "/list";
    const data = {
        listId: listId,
        oauthToken: user.token,
        oauthTokenSecret: user.secret,
        twitterId: user.twitterData?.uid,
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
        console.log(error);
    }
};

export const manageMember = async (user: User, listId: string, action: string) => {
    const url = configs.API_URL + `/list/member`;
    const data = {
        listId: listId,
        twitterId: user.twitterData?.uid,
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
        console.log(error);
    }
};
