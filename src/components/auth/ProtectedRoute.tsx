"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("session");
    const userInfo = localStorage.getItem("userInfo");

    if (!token || !userInfo) {
      // Si no hay sesión, redirigir al login
      router.push("/account/login");
      return;
    }

    const userData = JSON.parse(userInfo);

    if (userData.role !== "ADMIN") {
      // Si el usuario no es administrador, redirigir a la página principal
      router.push("/");
    } else {
      // Usuario tiene permisos
      setHasPermission(true);
    }

    // Desactivar el estado de carga una vez que se ha determinado el acceso
    setLoading(false);
  }, [router]);

  if (loading) {
    // Mostrar el spinner mientras se verifica la autenticación y permisos
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  // Si el usuario tiene permisos, mostrar el contenido protegido
  return hasPermission ? <>{children}</> : null;
}

export default ProtectedRoute;
