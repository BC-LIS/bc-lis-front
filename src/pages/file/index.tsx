"use client";

import { Dashboard } from "@/components/layout/dashboard/Dashboard";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      const user = JSON.parse(userInfo);
      if (user.role !== "ADMIN" && user.role !== "TECHNICAL") {
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

  return (
    <section className="flex items-center justify-center my-4 sm:p-4 h-full w-full">
      <Dashboard />
    </section>
  );
}
