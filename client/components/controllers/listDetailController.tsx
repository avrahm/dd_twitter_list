import { useEffect, useState } from "react";
import { getListOfUsers, manageFollow, manageList, manageMember } from "../../api/twitter/functions";
import { List, Member, User } from "../../config/Interfaces";
import { useAuth } from "../../context/AuthProvider";
import { useWallet } from "../../context/WalletProvider";
import { ListDetailView } from "../views/listDetailView";

export const ListDetailController = ({ list, members }: { list: List; members: Member[] }) => {
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [isMember, setIsMember] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [followAllCount, setFollowAllCount] = useState<number>(0);
    const { user } = useAuth();
    const { hasNFT } = useWallet();

    const isUserOnListByType = async (user: User, type: string) => {
        const allUsersByType = await getListOfUsers(type); // followers or members
        if (!allUsersByType || allUsersByType == undefined || allUsersByType.length == 0) {
            if (type === "followers") setIsFollowing(false);
            if (type === "members") setIsMember(false);
            return;
        }
        const { users } = await allUsersByType;
        if (users.length == 0) {
            if (type === "followers") setIsFollowing(false);
            if (type === "members") setIsMember(false);
            return;
        }
        const isMatch = users.some((eaUser: { id_str: string }) => eaUser.id_str == user.twitterData?.uid);
        if (type === "followers") setIsFollowing(isMatch);
        if (type === "members") setIsMember(isMatch);
        return;
    };

    const userAction = async (action: string, listId: string) => {
        setIsLoading(true);
        switch (action) {
            case "follow":
                await manageList(user as User, listId, "create");
                await isUserOnListByType(user, "followers");
                setIsLoading(false);
                break;
            case "unfollow":
                await manageList(user as User, listId, "destroy");
                await isUserOnListByType(user, "followers");
                setIsLoading(false);
                break;
            case "addMember":
                await manageMember(user as User, listId, "create");
                await isUserOnListByType(user, "members");
                setIsLoading(false);
                break;
            case "removeMember":
                await manageMember(user as User, listId, "destroy");
                await isUserOnListByType(user, "members");
                setIsLoading(false);
                break;
            default:
                return false;
        }
    };

    const getIds = (members: Member[]) => {
        const ids = members.map((user: Member) => user.id_str);
        return ids;
    };

    const followAll = async () => {
        setIsLoading(true);

        // get ids of all members
        const ids = getIds(members);

        // loop through ids at an interval of 1 second
        const interval = setInterval(async () => {
            if (ids.length == 0) {
                clearInterval(interval);
                setIsLoading(false);
                return;
            }
            const id = ids.shift();
            await manageFollow(user as User, id, "create");
            setFollowAllCount(followAllCount + 1);
            console.log(followAllCount);
        }, 1000);

        setIsLoading(false);
    };

    useEffect(() => {
        if (list && user) {
            isUserOnListByType(user, "members");
            isUserOnListByType(user, "followers");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list === null]);

    return (
        <div>
            {list && (
                <ListDetailView
                    list={list}
                    userAction={userAction}
                    isFollowing={isFollowing}
                    isMember={isMember}
                    isLoading={isLoading}
                    hasNFT={hasNFT}
                    followAll={followAll}
                />
            )}
        </div>
    );
};
