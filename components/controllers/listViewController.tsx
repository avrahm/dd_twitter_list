import { NextPage } from "next";
import { useEffect, useState } from "react";
import { getListOfUsers, getMainList } from "../../api/twitter/functions";
import { Member } from "../../config/Interfaces";
import { useAuth } from "../../context/AuthProvider";
import { ListView } from "../views/listView";

export const ListViewController: NextPage = () => {
    const [list, setList] = useState<any>(null);
    const [members, setMembers] = useState<Member[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            getMainList().then(async (list) => {
                setList(list[0]);
                getListOfUsers(user, "members").then((members) => {
                    setMembers(members.users);
                });
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }, [user === null]);

    return <ListView list={list} members={members} />;
};
