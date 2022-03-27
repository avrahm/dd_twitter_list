import { List } from "../../config/Interfaces";

export const ListDetailView = ({
    item,
    index,
    isFollowing,
    isMember,
    userAction,
}: {
    item: List;
    index: number;
    isFollowing: boolean;
    isMember: boolean;
    userAction: Function;
}) => {
    {
        return (
            <div key={index} className="flex flex-col p-4">
                <div className="font-bold">{item.name}</div>
                <div>{item.description}</div>
                <div>Members: {item.member_count}</div>
                <div>Followers: {item.subscriber_count}</div>
                <div className="flex flex-row py-2">
                    {isFollowing ? (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded mx-2"
                            onClick={() => {
                                userAction("unfollow", item.id_str);
                            }}
                        >
                            Unfollow
                        </button>
                    ) : (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded mx-2"
                            onClick={() => {
                                userAction("follow", item.id_str);
                            }}
                        >
                            Follow
                        </button>
                    )}
                    {isMember ? (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded mx-2"
                            onClick={() => {
                                userAction("removeMember", item.id_str);
                            }}
                        >
                            Leave List
                        </button>
                    ) : (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded mx-2"
                            onClick={() => {
                                userAction("addMember", item.id_str);
                            }}
                        >
                            Join List
                        </button>
                    )}
                </div>
            </div>
        );
    }
};
