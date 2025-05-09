"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RegisterForm from "@/components/auth/RegisterForm";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function RegisterPage() {
  const router = useRouter();
  // Estado para manejar el loading spinner
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      const user = JSON.parse(userInfo);
      if (user.role !== "ADMIN") {
        // Redirigir a la página principal si no es administrador
        router.push("/");
      } else {
        // Si es administrador, dejar de mostrar el spinner
        setLoading(false);
      }
    } else {
      // Redirigir a la página de inicio de sesión si no está autenticado
      router.push("/account/login");
    }
  }, [router]);

  // Mostrar el spinner mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  // Renderizar el formulario de registro si es un administrador autenticado
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-12 sm:px-0 py-8 sm:py-12 md:py-16">
      <RegisterForm />
    </section>
  );
}
