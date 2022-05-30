import { MdOpenInNew } from "react-icons/md";
import { List, Wallet } from "../../config/Interfaces";
import { useAuth } from "../../context/AuthProvider";
import { useWallet } from "../../context/WalletProvider";

export const ListDetailView = ({
    list,
    userAction,
    isLoading,
    isFollowing,
    isMember,
    hasNFT,
    followAll,
    status,
}: {
    list: List;
    userAction: Function;
    isLoading: boolean | undefined;
    isFollowing: boolean;
    isMember: boolean;
    hasNFT: boolean;
    followAll: Function;
    status: string;
}) => {
    const { connectWallet, wallet } = useWallet();
    const { user } = useAuth();
    return (
        <div className="flex flex-col p-4 w-full lg:w-[300px]">
            {list && (
                <>
                    <div className="font-bold">{list.name}</div>
                    <div>{list.description}</div>
                    <div>Members: {list.member_count}</div>
                    <div>Followers: {list.subscriber_count}</div>
                    {user && (
                        <div className="flex flex-col justify-center items-center">
                            <ListDetailButtonContainer
                                connectWallet={connectWallet}
                                wallet={wallet}
                                list={list}
                                userAction={userAction}
                                isLoading={isLoading}
                                isFollowing={isFollowing}
                                isMember={isMember}
                                hasNFT={hasNFT}
                                followAll={followAll}
                            />
                            <span>{status}</span>
                        </div>
                    )}
                    {wallet && !hasNFT && (
                        <div className="self-center">
                            <a className="flex flex-row items-center" href="https://opensea.io/collection/devs-for-revolution">
                                <span className="pr-2">Buy D4R on OpenSea</span> <MdOpenInNew />
                            </a>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

const ListDetailButton = ({
    list,
    userAction,
    isLoading,
    action,
    label,
}: {
    list: List;
    action: string;
    label: string;
    userAction: Function;
    isLoading: boolean | undefined;
}) => {
    return (
        <button
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded mx-2 disabled:bg-slate-400"
            onClick={() => {
                userAction(action, list.id_str);
            }}
        >
            {label}
        </button>
    );
};

const ListDetailButtonContainer = ({
    list,
    userAction,
    isLoading,
    isFollowing,
    isMember,
    wallet,
    connectWallet,
    hasNFT,
    followAll,
}: {
    list: List;
    userAction: Function;
    isLoading: boolean | undefined;
    isFollowing: boolean;
    isMember: boolean;
    wallet: Wallet;
    connectWallet: Function;
    hasNFT: boolean;
    followAll: Function;
}) => {
    return (
        <>
            <div className="flex flex-row py-2 justify-center">
                {isFollowing ? (
                    <ListDetailButton list={list} userAction={userAction} isLoading={isLoading} action="unfollow" label="Unfollow List" />
                ) : (
                    <ListDetailButton list={list} userAction={userAction} isLoading={isLoading} action="follow" label="Follow List" />
                )}
                {hasNFT ? (
                    isMember ? (
                        <ListDetailButton list={list} userAction={userAction} isLoading={isLoading} action="removeMember" label="Leave List" />
                    ) : (
                        <ListDetailButton list={list} userAction={userAction} isLoading={isLoading} action="addMember" label="Join List" />
                    )
                ) : (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded mx-2 disabled:bg-slate-400 disabled:text-gray-800"
                        onClick={() => connectWallet()}
                        disabled={wallet && !hasNFT && true}
                    >
                        {!wallet ? "Validate DD NFT" : "No NFT Found"}
                    </button>
                )}
                <button
                    className="bg-green-500 hover:bg-green-700 text-black hover:text-white py-1 px-2 rounded mx-2 disabled:bg-slate-400 disabled:text-gray-800"
                    onClick={() => followAll()}
                    disabled={false}
                >
                    Follow Everyone
                </button>
            </div>
        </>
    );
};
