import { ThemeProvider } from "@/components/dark-mode/ThemeProvider";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es-CO">
      <Head title="Base de conocimiento LIS">
        <meta
          name="description"
          content="Página para centralizar la información de los procesos que se llevan a cabo en el Laboratorio Integrado de Sistemas"
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <Main />
          <Toaster />
          <NextScript />
        </ThemeProvider>
      </body>
    </Html>
  );
}
