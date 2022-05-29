import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthProvider";
import { ThemeProvider } from "../context/ThemeProvider";
import { WalletProvider } from "../context/WalletProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <WalletProvider>
                <ThemeProvider darkMode={false}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </WalletProvider>
        </AuthProvider>
    );
}

export default MyApp;
