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
        getMainList().then(async (list) => {
            if (!list) return null;
            setList(list[0]);
            getListOfUsers("members").then((members) => {
                setMembers(members.users);
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user === null]);

    return <ListView list={list} members={members} />;
};
