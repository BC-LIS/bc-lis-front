import { toast } from "@/hooks/use-toast";
import { NextResponse } from "next/server";

export async function login(username: string, password: string) {
  try {
    const response = await fetch("BACK_URL/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const { message } = await response.json();
      toast({
        title: "Error ❌",
        description: message || "Credenciales inválidas, inténtalo nuevamente.",
      });
    }

    // Obtener el token de la respuesta y guardarlo en las localStorage
    const { token } = await response.json();
    localStorage.setItem("session", token);

    // Redirige al usuario a la página principal
    NextResponse.redirect("/");
  } catch (error) {
    toast({
      title: "Error ❌",
      description: "Ha ocurrido un error en la solicitud",
    });
  }
}

export function logout() {
  localStorage.removeItem("session");
  // Redirige al usuario a la página de inicio
  NextResponse.redirect("/");
}

export function getSession() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  // Devuelve el token si existe
  return token;
}
