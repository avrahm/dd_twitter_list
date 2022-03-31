import { List, Member } from "../../config/Interfaces";
import { ListDetailController } from "../controllers/listDetailController";
import { MemberListController } from "../controllers/memberListController";

export const ListView = ({ list, members }: { list: List; members: Member[] }) => {
    return (
        <div className="flex lg:flex-row flex-col">
            <ListDetailController list={list} />
            <MemberListController members={members} />
        </div>
    );
};
