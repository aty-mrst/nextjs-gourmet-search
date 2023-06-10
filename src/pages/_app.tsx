import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <NextNProgress color="#017D01" />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
