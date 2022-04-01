import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthProvider";
import { WalletProvider } from "../context/WalletProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <WalletProvider>
                <Component {...pageProps} />
            </WalletProvider>
        </AuthProvider>
    );
}

export default MyApp;
