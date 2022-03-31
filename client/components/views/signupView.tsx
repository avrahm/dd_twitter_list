import { twitterSignIn } from "../../api/firebase/signInWithTwitter";
import { useAuth } from "../../context/AuthProvider";

export const SignUpView = () => {
    const { user, signOutUser } = useAuth();

    return (
        <div>
            {user ? (
                <div className="flex flex-col p-2">
                    <div className="flex flex-row items-center justify-center pb-4">
                        <div>
                            <span className="">Welcome, {user.twitterData?.displayName}</span>
                        </div>
                        <div className="p-2">
                            <button
                                onClick={signOutUser}
                                className="bg-blue-500 hover:bg-blue-300 w-[100px] text-white py-1 px-2 rounded"
                            >
                                Sign out
                            </button>
                        </div>
                    </div>
                    <hr className="border-2 w-full bg-gray-400" />
                </div>
            ) : (
                <div className="flex flex-col text-center p-5 border-2">
                    <p className="text-xl p-3">Sign in to get started.</p>
                    <button
                        className="bg-blue-500 hover:bg-blue-300 text-white py-1 px-2 rounded"
                        onClick={twitterSignIn}
                    >
                        Sign in with Twitter
                    </button>
                </div>
            )}
        </div>
    );
};
