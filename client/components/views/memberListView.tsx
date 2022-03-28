import Image from "next/image";
import { Member } from "../../config/Interfaces";

export const MemberListView = ({ member, index }: { member: Member; index: number }) => {
    return (
        <div key={member.id_str} className="p-2 flex flex-row w-[900px]">
            <div className="p-2 w-[75px]">
                <Image
                    src={member.profile_image_url_https}
                    width={48}
                    height={48}
                    alt={member.screen_name}
                    className="rounded-full"
                />
            </div>
            <div className="flex flex-col">
                <div className="text-white-500 font-bold">{member.name}</div>
                <div className="text-gray-400">@{member.screen_name}</div>
                <div className="w-[600px] text-[13px] py-2">{member.description}</div>
                <div className="flex flex-row text-[13px]">
                    <div className="pr-2">{member.followers_count} Followers</div>
                    <div className="pl-2">{member.friends_count} Following</div>
                </div>
            </div>
        </div>
    );
};
