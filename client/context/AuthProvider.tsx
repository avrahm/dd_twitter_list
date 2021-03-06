import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth } from "../api/firebase/firebase";
import { getUser, refreshToken, signout } from "../api/firebase/functions";
import { User } from "../config/Interfaces";

const defaultState = {
    user: {
        uid: "",
        twitterData: { uid: "", displayName: "", photoURL: "", email: "" },
    },
    setUser: () => {},
};

interface UserContext {
    user: User;
    setUser: (user: User) => void;
    signOutUser?: () => void;
}

const AuthContext = createContext<UserContext>(defaultState);

export type Props = {
    children: ReactNode;
    user?: User | null;
};

const AuthProvider = (props: Props): JSX.Element | any => {
    const { children } = props;
    const [user, setUser] = useState<any | null>(null);
    const signOutUser = () => {
        setUser(null);
        signout();
    };

    useEffect((): any => {
        auth.onAuthStateChanged(async (user: any) => {
            if (user) {
                await refreshToken(user);
                const userData = await getUser(user.uid);
                setUser(userData);
            } else {
                setUser(null);
            }
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                signOutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
