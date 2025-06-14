"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Head from "next/head";

export default function LoginPage() {
  const router = useRouter();
  // Estado para controlar el loading spinner
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("session");
    if (token) {
      // Si el usuario ya está autenticado, redirigir a la página principal
      router.push("/");
    } else {
      // Si no hay token, dejar de mostrar el spinner y mostrar el formulario
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  return (
    <div className="relative flex w-full h-screen items-center justify-center overflow-hidden">
      <Head>
        <title>Inicio de sesión | BCLIS</title>
      </Head>
      {/* Fondos difuminados */}
      <div className="absolute z-10 w-2/3 h-3/4 bg-udea-950 rounded-full blur-2xl opacity-10"></div>
      <div className="absolute z-20 w-1/2 h-1/2 bg-primary rounded-full blur-2xl opacity-30"></div>

      {/* Card principal */}
      <div className="relative z-30 w-full max-w-4xl lg:h-auto rounded-3xl bg-popover shadow-2xl flex flex-col lg:flex-row sm:justify-around items-center gap-4 p-6">
        {/* Imagen */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            width={0}
            height={0}
            sizes="100%"
            src="/BCLIS.png"
            className="lg:w-2/3 w-1/3"
            alt="Imagen login"
            priority
          />
        </div>

        {/* Formulario */}
        <div className="w-full lg:w-1/2 bg-popover rounded-3xl flex flex-col justify-center items-center lg:border-l-2 shadow-lg p-4">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Inicio de Sesión
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
