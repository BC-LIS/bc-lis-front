"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import RegisterForm from "@/components/auth/RegisterForm";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const user = JSON.parse(userInfo);
      if (user.role !== "ADMIN") {
        // Redirige a la página principal si no es administrador
        router.push("/");
      }
    } else {
      // Redirige a la página de inicio de sesión si no está autenticado
      router.push("/account/login");
    }
  }, [router]);

  return (
    <ProtectedRoute>
      <section className="flex items-center justify-center my-4 p-2 gap-4 sm:p-4">
        <RegisterForm />
      </section>
    </ProtectedRoute>
  );
}
