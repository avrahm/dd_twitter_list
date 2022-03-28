import { List } from "../../config/Interfaces";

export const ListDetailView = ({
    list,
    isFollowing,
    isMember,
    userAction,
}: {
    list: List;
    isFollowing: boolean;
    isMember: boolean;
    userAction: Function;
}) => {
    console.log("ListDetailView", list);

    return (
        <div className="flex flex-col p-4">
            {list && (
                <>
                    <div className="font-bold">{list.name}</div>
                    <div>{list.description}</div>
                    <div>Members: {list.member_count}</div>
                    <div>Followers: {list.subscriber_count}</div>
                    <div className="flex flex-row py-2">
                        {isFollowing ? (
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded mx-2"
                                onClick={() => {
                                    userAction("unfollow", list.id_str);
                                }}
                            >
                                Unfollow
                            </button>
                        ) : (
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded mx-2"
                                onClick={() => {
                                    userAction("follow", list.id_str);
                                }}
                            >
                                Follow
                            </button>
                        )}
                        {isMember ? (
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded mx-2"
                                onClick={() => {
                                    userAction("removeMember", list.id_str);
                                }}
                            >
                                Leave List
                            </button>
                        ) : (
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded mx-2"
                                onClick={() => {
                                    userAction("addMember", list.id_str);
                                }}
                            >
                                Join List
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
