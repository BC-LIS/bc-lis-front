"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputLogin } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LockKeyhole, User } from "lucide-react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/use-auth";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const { login } = useAuth();
  const ENDPOINT_LOGIN = process.env.NEXT_PUBLIC_API_URL_LOGIN;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch(`${ENDPOINT_LOGIN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        toast({
          title: "Error ❌",
          description:
            message || "Credenciales inválidas, inténtalo nuevamente.",
        });
        return;
      }

      // Obtener el token y los datos del usuario de la respuesta
      const { token, name, lastname, role } = await response.json();

      // Usar la función login del contexto
      login({ name, lastname, role }, token);

      // Redirigir al usuario a la página principal
      router.push("/");
    } catch (error) {
      toast({
        title: "Error ❌",
        description: "Ha ocurrido un error en la solicitud",
      });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="flex justify-center items-center">
          <InputLogin
            id="username"
            type="text"
            icon={<User />}
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center items-center">
          <InputLogin
            id="password"
            type="password"
            icon={<LockKeyhole />}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center items-center">
          <Button
            type="submit"
            className="sm:w-80 sm:h-12 text-base font-bold bg-primary hover:bg-chart-6 flex justify-center items-center"
          >
            Iniciar sesión
          </Button>
        </div>
      </form>
    </>
  );
}
