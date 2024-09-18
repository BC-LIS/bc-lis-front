"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { InputLogin } from "@/components/ui/input";
import { LockKeyhole, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { login } from "@/lib/LoginService";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit() {
    try {
      await login(username, password);
    } catch (error) {
      toast({
        title: "Error ❌",
        description: "Ha ocurrido un error en la solicitud",
      });
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-6">
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
        <a href="#" className="text-secondary hover:underline">
          Crea una cuenta
        </a>
      </div>
    </form>
  );
}
