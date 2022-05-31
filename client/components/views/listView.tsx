import { List, Member } from "../../config/Interfaces";
import { ListDetailController } from "../controllers/listDetailController";
import { MemberListController } from "../controllers/memberListController";

export const ListView = ({
    list,
    members,
    following,
    errors,
    status,
    followAll,
    isLoading,
    setIsLoading,
}: {
    list: List;
    members: Member[];
    following: string[];
    errors: string[];
    status: string;
    followAll: Function;
    isLoading: boolean;
    setIsLoading: Function;
}) => {
    return (
        <div className="flex lg:flex-row flex-col">
            <ListDetailController
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                list={list}
                members={members}
                status={status}
                followAll={followAll}
            />
            <MemberListController list={list} members={members} following={following} errors={errors} />
        </div>
    );
};
