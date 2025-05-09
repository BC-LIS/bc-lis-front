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

    if (!userInfo) {
      // Redirigir a la página de inicio de sesión si no está autenticado
      router.push("/account/login");
    } else {
      // Si el usuario está autenticado, ocultar el loading spinner
      setLoading(false);
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
    <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8">
      <DocumentForm />
    </div>
  );
}
