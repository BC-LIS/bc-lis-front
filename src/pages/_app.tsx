import { ThemeProvider } from "@/components/dark-mode/ThemeProvider";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </ThemeProvider>
  );
}
