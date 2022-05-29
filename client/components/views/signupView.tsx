import { FaTwitter } from "react-icons/fa";
import { twitterSignIn } from "../../api/firebase/signInWithTwitter";
import { useAuth } from "../../context/AuthProvider";

export const SignUpView = () => {
    const { user, signOutUser } = useAuth();

    return (
        <div className="text-center">
            {user ? (
                <div className="flex flex-col p-2">
                    <div className="flex flex-row items-center justify-center pb-4">
                        <div>
                            <span className="">Welcome, {user.twitterData?.displayName}</span>
                        </div>
                        <div className="p-2">
                            <button onClick={signOutUser} className="bg-blue-500 hover:bg-blue-700 w-[100px] text-white py-1 px-2 rounded">
                                Sign out
                            </button>
                        </div>
                    </div>
                    <hr className="border-2 w-full bg-gray-600" />
                </div>
            ) : (
                <div className="flex flex-col p-2">
                    <div className="flex flex-row items-center justify-center pb-4">
                        <div>
                            <span className="">Sign in to get started.</span>
                        </div>
                        <div className="p-2">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded flex flex-row items-center justify-center"
                                onClick={twitterSignIn}
                            >
                                <FaTwitter /> <span className="pl-3"> Sign in with Twitter</span>
                            </button>
                        </div>
                    </div>
                    <hr className="border-2 w-full bg-gray-600" />
                </div>
            )}
        </div>
    );
};
