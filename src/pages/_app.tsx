import { ThemeProvider } from "@/components/dark-mode/ThemeProvider";
import Navbar from "@/components/bars/Navbar";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/hooks/use-auth";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}
