import Image from "next/image";
import { useEffect, useState } from "react";
import { manageFollow } from "../../api/twitter/functions";
import { Member, User } from "../../config/Interfaces";
import { useAuth } from "../../context/AuthProvider";
import { useTheme } from "../../context/ThemeProvider";

export const MemberListView = ({
    member,
    index,
    isFollowing,
    isError,
}: {
    member: Member;
    index: number;
    isFollowing: boolean;
    isError: boolean;
}) => {
    const { darkMode } = useTheme();
    const { user } = useAuth();

    const getStatus = () => {
        if (isError) setStatus("Error");
        if (isFollowing) setStatus("Unfollow");
    };

    const [status, setStatus] = useState<string>("Follow");

    async function followUser(userId: string, action: string) {
        const response = await manageFollow(user as User, userId, action);
        if (response) {
            setStatus("OK");
        } else {
            setStatus("Error");
        }
    }

    useEffect(() => {
        getStatus();
    }, [isFollowing, isError]);

    return (
        <div key={member.id_str} className="p-2 flex flex-row sm:w-[610px] w-full hover:shadow">
            <div className="p-2 w-[75px]">
                <a href={`https://www.twitter.com/${member.screen_name}`} target="_blank" rel="noreferrer">
                    <Image src={member.profile_image_url_https} width={48} height={48} alt={member.screen_name} className="rounded-full" />
                </a>
            </div>
            <div className="flex flex-col sm:w-[520px] w-full">
                <div className="flex flex-row justify-between items-center">
                    <div>
                        <a href={`https://www.twitter.com/${member.screen_name}`} target="_blank" rel="noreferrer">
                            <div className={`font-bold ${darkMode ? "text-gray-400 hover:text-gray-500" : "text-gray-700 hover:text-gray-900"}`}>
                                {member.name}
                            </div>
                            <div className={`font-semibold ${darkMode ? "text-gray-200 hover:text-gray-400" : "text-gray-500 hover:text-gray-700"}`}>
                                @{member.screen_name}
                            </div>
                        </a>
                    </div>
                    {user && (
                        <button
                            // disabled={isFollowing}
                            onClick={() => (isFollowing ? followUser(member.id_str, "destroy") : followUser(member.id_str, "create"))}
                            className="text-right cursor-pointer  bg-blue-500 text-white rounded-full px-3 py-1 
                            "
                        >
                            {status}
                        </button>
                    )}
                </div>
                <div className="flex flex-col">
                    <div className="text-[13px] py-2">{member.description}</div>
                    <div className="flex flex-row text-[13px]">
                        <div className="pr-2">{member.followers_count} Followers</div>
                        <div className="pl-2">{member.friends_count} Following</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
