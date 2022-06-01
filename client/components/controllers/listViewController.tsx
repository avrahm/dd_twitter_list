import { NextPage } from "next";
import { useEffect, useState } from "react";
import { getUserListFollows, saveFollows } from "../../api/firebase/functions";
import { getListOfUsers, getMainList, manageFollow } from "../../api/twitter/functions";
import { Member, User } from "../../config/Interfaces";
import { useAuth } from "../../context/AuthProvider";
import { ListView } from "../views/listView";

export const ListViewController: NextPage = () => {
    const { user } = useAuth();
    const [list, setList] = useState<any>(null);
    const [members, setMembers] = useState<Member[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<string>("");

    // get follows for the list
    const [following, setFollowing] = useState<any[]>([]);
    const [errors, setErrors] = useState<any[]>([]);

    let followSpeed = 1500;
    let successfulCount = following.length || 0;
    let errorCount = 0;

    useEffect(() => {
        getMainList().then(async (list) => {
            if (!list) return null;
            setList(list[0]);
            getListOfUsers("members").then((members) => {
                setMembers(members.users);
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user === null]);

    const getIds = (members: Member[]) => {
        const ids = members.map((user: Member) => user.id_str);
        // filter the ids members that user has followed
        const filteredIds = ids.filter((id: string) => {
            return following.indexOf(id) === -1;
        });
        return filteredIds;
    };

    const followAll = async () => {
        setIsLoading(true);

        // get ids of all members
        const ids: string[] = getIds(members);

        const errorIds: string[] = [];
        const successfulIds: string[] = following || [];

        // loop through ids at an interval of 1 second
        const interval = setInterval(async () => {
            if (ids.length == 0) {
                clearInterval(interval);
                setIsLoading(false);
                // upload errors and successes to firebase

                // only upload unique errorIds
                const uniqueErrorIds = [...new Set(errorIds)];

                await saveFollows(user, list.id_str, uniqueErrorIds, successfulIds);
                const message = errorCount > 0 ? "Try again in a few hours" : "All members followed";
                setStatus(`Successful: ${successfulCount} | Pending: ${errorCount} out of ${members.length}. ${message}`);
                return;
            }
            const id: string | any = ids.shift();
            setStatus(
                `Remaining: ${ids.length} | Successful: ${successfulCount} | Pending: ${errorCount} out of ${members.length}. DO NOT CLOSE THIS WINDOW.`
            );

            // follow user
            try {
                const response = await manageFollow(user as User, id, "create");
                if (response) {
                    successfulCount++;
                    successfulIds.push(id);
                } else {
                    errorIds.push(id);
                    errorCount++;
                    if (errorCount < 10) followSpeed = followSpeed * 1.5;
                    if (errorCount > 10) followSpeed = 1500;
                }
            } catch (error) {
                console.error(error);
            }
        }, followSpeed);

        setIsLoading(false);
    };

    const getListOfFollows = async () => {
        const response = await getUserListFollows(user, list.id_str);
        if (response) {
            setFollowing(response.successes);
            setErrors(response.errors);
            // convert response last updated firebase timestamp to date
            const lastUpdated = new Date(response.lastUpdated.seconds * 1000).toLocaleString();
            setStatus(`Last updated: ${lastUpdated}.  Successful: ${response.successes.length} | Pending: ${[...new Set(response.errors)].length}`);
        }
    };

    useEffect(() => {
        if (user && list) getListOfFollows();
    }, [user]);

    return (
        <ListView
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            list={list}
            members={members}
            followAll={followAll}
            status={status}
            following={following}
            errors={errors}
        />
    );
};
