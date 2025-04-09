"use client";

import TextEditor from "@/components/editor/TextEditor";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Editor() {
  const [post, setPost] = useState("");
  const router = useRouter();
  // Estado para manejar el loading spinner
  const [loading, setLoading] = useState(true);

  const onChange = (content: string) => {
    setPost(content);
  };

  const saveDocument = async () => {
    const response = await fetch("/api/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Nuevo Documento", content: post }),
    });

    if (response.ok) {
      alert("Documento guardado");
    }
  };

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
      <div className="flex flex-col justify-center items-center h-screen">
        <LoadingSpinner size={48} />
        <span className="text-lg font-bold mt-4">
          No tienes permiso para ver esta página
        </span>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8">
      <TextEditor content={post} onChange={onChange} />
      <Button onClick={saveDocument}>Guardar</Button>
    </div>
  );
}
