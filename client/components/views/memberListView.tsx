import Image from "next/image";
import { Member } from "../../config/Interfaces";

export const MemberListView = ({ member, index }: { member: Member; index: number }) => {
    return (
        <div key={member.id_str} className="p-2 flex flex-row sm:w-[610px] w-full hover:shadow">
            <div className="p-2 w-[75px]">
                <a href={`https://www.twitter.com/${member.screen_name}`}>
                    <Image
                        src={member.profile_image_url_https}
                        width={48}
                        height={48}
                        alt={member.screen_name}
                        className="rounded-full"
                    />
                </a>
            </div>
            <div className="flex flex-col sm:w-[520px] w-full">
                <div className="flex flex-row justify-between items-center">
                    <div>
                        <div className="text-gray-700 font-bold">{member.name}</div>
                        <div className="text-gray-500 hover:text-gray-700">
                            <a href={`https://www.twitter.com/${member.screen_name}`}>
                                @{member.screen_name}
                            </a>
                        </div>
                    </div>
                    {/* <div className="text-right border-2 border-blue-400 bg-blue-500 text-white rounded-full px-3">
                        Follow
                    </div> */}
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
