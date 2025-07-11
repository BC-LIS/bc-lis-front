"use client";

import DocumentForm from "@/components/layout/form/DocumentForm";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Editor() {
  const router = useRouter();
  // Estado para manejar el loading spinner
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      const user = JSON.parse(userInfo);
      if (user.role !== "ADMIN" && user.role !== "TECHNICAL") {
        // Redirigir a la página principal si no es administrador
        router.push("/file");
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
      <div className="flex flex-col justify-center items-center h-screen">
        <LoadingSpinner size={48} />
        <span className="text-lg font-bold mt-4">
          Inicie sesión para usar el editor de texto
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-8">
      <div className="w-full max-w-4xl">
        <DocumentForm />
      </div>
    </div>
  );
}
