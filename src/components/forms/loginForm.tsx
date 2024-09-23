"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputLogin } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LockKeyhole, User } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();
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

      // Guardar el token y la información del usuario en localStorage
      localStorage.setItem("session", token);
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ name, lastname, role })
      );

      // Redirige al usuario a la página principal
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
        <div className="text-sm flex justify-center items-center">
          <a href="#" className="w-full flex justify-end hover:underline">
            ¿Olvidaste la contraseña?
          </a>
        </div>
        <div className="flex justify-center items-center">
          <Button
            type="submit"
            className="sm:w-80 sm:h-12 text-base font-bold bg-primary hover:bg-chart-6 flex justify-center items-center"
          >
            Iniciar sesión
          </Button>
        </div>
        <div className="text-sm text-center flex justify-center items-center">
          ¿Cuenta no registrada?{" "}
          <Link href="/register" className="text-secondary hover:underline">
              Crea una cuenta
          </Link>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
