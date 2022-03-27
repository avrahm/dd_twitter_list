import { NextPage } from "next";
import { useEffect, useState } from "react";
import { getListOfUsers, getMainList, manageList, manageMember } from "../../api/twitter/lists";
import { User } from "../../config/Interfaces";
import { useAuth } from "../../context/AuthProvider";
import { ListDetailView } from "../views/listDetailView";

export const ListDetailController: NextPage = () => {
    const [list, setList] = useState<any[]>([]);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [isMember, setIsMember] = useState<boolean>(false);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            getMainList().then(async (list) => {
                setList(list);
                isUserOnListByType(user, "members");
                isUserOnListByType(user, "followers");
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user === null]);

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

    return (
        <div>
            {list &&
                user &&
                list.map((item, index) => {
                    return (
                        <ListDetailView
                            item={item}
                            index={index}
                            key={index}
                            userAction={userAction}
                            isFollowing={isFollowing}
                            isMember={isMember}
                        />
                    );
                })}
        </div>
    );
};
