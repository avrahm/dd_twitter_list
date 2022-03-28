import { useEffect, useState } from "react";
import { getListOfUsers, manageList, manageMember } from "../../api/twitter/functions";
import { List, User } from "../../config/Interfaces";
import { useAuth } from "../../context/AuthProvider";
import { ListDetailView } from "../views/listDetailView";

export const ListDetailController = ({ list }: { list: List }) => {
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [isMember, setIsMember] = useState<boolean>(false);
    const { user } = useAuth();

    const isUserOnListByType = async (user: User, type: string) => {
        const allUsersByType = await getListOfUsers(user, type); // followers or members
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
        const isMatch = users.some(
            (eaUser: { id_str: string }) => eaUser.id_str == user.twitterData?.uid
        );
        if (type === "followers") setIsFollowing(isMatch);
        if (type === "members") setIsMember(isMatch);
        return;
    };

    const userAction = async (action: string, listId: string) => {
        switch (action) {
            case "follow":
                await manageList(user as User, listId, "create");
                isUserOnListByType(user, "followers");
                return;
            case "unfollow":
                await manageList(user as User, listId, "destroy");
                isUserOnListByType(user, "followers");
                return;
            case "addMember":
                await manageMember(user as User, listId, "create");
                isUserOnListByType(user, "members");
                return;
            case "removeMember":
                await manageMember(user as User, listId, "destroy");
                isUserOnListByType(user, "members");
                return;
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
    }, [list === null]);

    return (
        <div>
            <ListDetailView
                list={list}
                userAction={userAction}
                isFollowing={isFollowing}
                isMember={isMember}
            />
        </div>
    );
};
