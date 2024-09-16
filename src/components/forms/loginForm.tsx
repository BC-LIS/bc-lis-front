"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { InputLogin } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { LockKeyhole, User } from "lucide-react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    console.log("Login attempt", { username, password });
    toast({
      title: "Intento de inicio de sesión",
      description: `Usuario: ${username}`,
      action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
    });
  };

  return (
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
          className="sm:w-80 sm:h-12 text-base text-popover-foreground font-bold bg-primary hover:bg-chart-6 flex justify-center items-center"
        >
          Iniciar sesión
        </Button>
      </div>
      <div className="text-sm text-center flex justify-center items-center">
        ¿Cuenta no registrada?{" "}
        <a href="#" className="text-primary hover:underline">
          Crea una cuenta
        </a>
      </div>
    </form>
  );
}
