import { Member } from "../../config/Interfaces";
import { useAuth } from "../../context/AuthProvider";
import { MemberListView } from "../views/memberListView";

export const MemberListController = ({ members }: { members: Member[] }) => {
    const { user } = useAuth();

    return (
        <div className="">
            {members &&
                user &&
                members.map((member, index) => {
                    return <MemberListView key={index} member={member} index={index} />;
                })}
        </div>
    );
};
