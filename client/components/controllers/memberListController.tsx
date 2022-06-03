import { useEffect, useState } from "react";
import { FcGenericSortingAsc, FcGenericSortingDesc } from "react-icons/fc";
import { List, Member } from "../../config/Interfaces";
import { useTheme } from "../../context/ThemeProvider";
import styles from "../../styles/Home.module.css";
import { MemberListView } from "../views/memberListView";

export const MemberListController = ({
    members,
    list,
    following,
    errors,
}: {
    members: Member[];
    list: List;
    following: string[];
    errors: string[];
}) => {
    const [sortedMembers, setSortedMembers] = useState<Member[]>(members);
    const [sort, setSort] = useState<boolean>(true);
    const [sortBy, setSortBy] = useState<string>("name");

    const sortListByName = (a: Member, b: Member) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        return 0;
    };

    const sortListByFollowersCount = (a: Member, b: Member) => {
        if (a.followers_count < b.followers_count) {
            return -1;
        }
        if (a.followers_count > b.followers_count) {
            return 1;
        }
        return 0;
    };

    const sortListByFollowingCount = (a: Member, b: Member) => {
        if (a.friends_count < b.friends_count) {
            return -1;
        }
        if (a.friends_count > b.friends_count) {
            return 1;
        }
        return 0;
    };

    function sortList(option: string) {
        let sortMethod: (a: Member, b: Member) => number;
        let sortedOptions: Member[] = [];
        setSortBy(option);
        switch (sortBy) {
            case "name":
                sortMethod = sortListByName;
                break;
            case "followers":
                sortMethod = sortListByFollowersCount;
                break;
            case "following":
                sortMethod = sortListByFollowingCount;
                break;
            default:
                sortMethod = sortListByName;
        }
        if (sort) {
            sortedOptions = [...members].sort(sortMethod);
        } else {
            sortedOptions = [...members].sort(sortMethod).reverse();
        }
        return setSortedMembers(sortedOptions);
    }

    useEffect(() => {
        setSortedMembers([...members].sort(sortListByName));
    }, [members, following, errors]);

    return (
        sortedMembers && (
            <>
                <SortedDiv sortBy={sortBy} sort={sort} setSort={setSort} sortList={sortList} />
                {sortedMembers.map((member, index) => {
                    // check if user is following the list
                    const isFollowing = following.includes(member.id_str);
                    const isError = errors.includes(member.id_str);
                    return <MemberListView key={index} member={member} index={index} isFollowing={isFollowing} isError={isError} />;
                })}
            </>
        )
    );
};

const SortedDiv = ({ children, sortBy, sort, setSort, sortList }: any) => {
    const { darkMode } = useTheme();
    return (
        <div className="flex flex-row justify-center items-center">
            <span className="pr-2"> Sort:</span>
            <select className={`px-2 ${darkMode ? styles.darkMode : styles.lightMode}`} onChange={(e) => sortList(e.target.value)}>
                <option value="name">Name</option>
                <option value="followers">Followers</option>
                <option value="following">Following</option>
            </select>

            <span
                className="pl-1 flex flex-row justify-center items-center cursor-pointer"
                onClick={() => {
                    setSort(!sort);
                    sortList(sortBy);
                }}
            >
                {sort ? (
                    <>
                        <FcGenericSortingDesc /> DESC
                    </>
                ) : (
                    <>
                        <FcGenericSortingAsc /> ASC
                    </>
                )}
            </span>
        </div>
    );
};
