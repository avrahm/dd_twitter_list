import { useEffect, useState } from "react";
import { getListOfUsers, manageList, manageMember } from "../../api/twitter/functions";
import { List, Member, User } from "../../config/Interfaces";
import { useAuth } from "../../context/AuthProvider";
import { useWallet } from "../../context/WalletProvider";
import { ListDetailView } from "../views/listDetailView";

export const ListDetailController = ({
    list,
    members,
    status,
    followAll,
    isLoading,
    setIsLoading,
}: {
    list: List;
    members: Member[];
    status: string;
    followAll: Function;
    isLoading: boolean;
    setIsLoading: Function;
}) => {
    const [isFollowingList, setIsFollowingList] = useState<boolean>(false);
    const [isMemberOfList, setIsMemberOfList] = useState<boolean>(false);

    const { user } = useAuth();
    const { hasNFT } = useWallet();

    const isUserOnListByType = async (user: User, type: string) => {
        const allUsersByType = await getListOfUsers(type); // followers or members
        if (!allUsersByType || allUsersByType == undefined || allUsersByType.length == 0) {
            if (type === "followers") setIsFollowingList(false);
            if (type === "members") setIsMemberOfList(false);
            return;
        }
        const { users } = await allUsersByType;
        if (users.length == 0) {
            if (type === "followers") setIsFollowingList(false);
            if (type === "members") setIsMemberOfList(false);
            return;
        }
        const isMatch = users.some((eaUser: { id_str: string }) => eaUser.id_str == user.twitterData?.uid);
        if (type === "followers") setIsFollowingList(isMatch);
        if (type === "members") setIsMemberOfList(isMatch);
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

    useEffect(() => {
        if (list && user) {
            isUserOnListByType(user, "members");
            isUserOnListByType(user, "followers");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <div>
            {list && (
                <ListDetailView
                    list={list}
                    userAction={userAction}
                    isFollowingList={isFollowingList}
                    isMemberOfList={isMemberOfList}
                    isLoading={isLoading}
                    hasNFT={hasNFT}
                    followAll={followAll}
                    status={status}
                />
            )}
        </div>
    );
};
