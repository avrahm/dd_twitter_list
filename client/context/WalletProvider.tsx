import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { checkGraph } from "../api/graph/functions";
import { Wallet } from "../config/Interfaces";
import { useAuth } from "./AuthProvider";

const defaultState = {
    wallet: {
        walletAddress: "",
    },
    hasNFT: false,
    signOutWallet: () => {},
    connectWallet: () => {},
};

interface WalletContext {
    wallet: Wallet;
    hasNFT: boolean;
    signOutWallet?: () => void;
    connectWallet: () => void;
}

const WalletContext = createContext<WalletContext>(defaultState);

export type Props = {
    children: ReactNode;
    wallet?: Wallet | null;
};

const WalletProvider = (props: Props): JSX.Element | any => {
    const { children } = props;
    const [wallet, setWallet] = useState<any | null>(null);
    const [hasNFT, setHasNFT] = useState(false);

    const { user } = useAuth();

    const signOutWallet = () => {
        setWallet(null);
        // signout();
    };

    useEffect((): any => {
        // check if wallet is connected
        if (user) {
            checkIfWalletIsConnected();
        }
    }, [user]);

    const connectWallet = async () => {
        try {
            const { ethereum } = window as any;
            console.log("Connecting metamask!");
            if (!ethereum) return alert("Please install metamask ");
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            setWallet(accounts[0]);
            await checkIfWalletIsConnected();
        } catch (error) {
            console.error(error);
        }
    };

    const checkIfWalletIsConnected = async () => {
        try {
            // extract ethereum object from the window
            const { ethereum } = window as any;
            if (!ethereum) return console.log("Please install metamask");

            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length !== 0) {
                const account = accounts[0];
                //set the current account
                setWallet(account);
                const hasD4RNFT = await checkGraph(account);
                if (hasD4RNFT) {
                    console.log("has NFT");
                    setHasNFT(true);
                }
            } else {
                setWallet(null);
                setHasNFT(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <WalletContext.Provider
            value={{
                wallet,
                signOutWallet,
                connectWallet,
                hasNFT,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

const useWallet = () => useContext(WalletContext);

export { WalletProvider, useWallet };
