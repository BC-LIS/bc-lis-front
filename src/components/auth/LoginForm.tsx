"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { InputLogin } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { formUserLogin, UserLoginFormSchema } from "@/schemas/UserSchema";
import { useForm } from "react-hook-form";
import { loginFields } from "@/constants/FormFields";

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const { login } = useAuth();
  const ENDPOINT_LOGIN = process.env.NEXT_PUBLIC_API_URL_LOGIN;

  const form = useForm<UserLoginFormSchema>({
    resolver: zodResolver(formUserLogin),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function sendData(data: UserLoginFormSchema) {
    try {
      const response = await fetch(`${ENDPOINT_LOGIN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast({
          title: "Error ❌",
          description: "Credenciales inválidas, inténtalo nuevamente.",
        });
        return;
      }

      // Obtener el token y los datos del usuario de la respuesta
      const { token, name, lastname, username, role } = await response.json();

      // Usar la función login del contexto
      login({ name, lastname, role, username }, token);

      // Redirigir al usuario a la página principal
      router.push("/");
    } catch {
      toast({
        title: "Error ❌",
        description: "Ha ocurrido un error en la solicitud",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(sendData)} className="mt-8 space-y-6">
        {loginFields.map((input) => (
          <FormField
            key={input.name}
            control={form.control}
            name={input.name as keyof UserLoginFormSchema}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{input.label}</FormLabel>
                <FormControl>
                  <InputLogin
                    {...field}
                    type={input.type}
                    icon={<input.icon />}
                    placeholder={input.placeholder}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <div className="flex justify-center items-center">
          <Button
            type="submit"
            className="sm:w-80 sm:h-12 text-base font-bold bg-primary hover:bg-chart-6 flex justify-center items-center"
          >
            Iniciar sesión
          </Button>
        </div>
      </form>
    </Form>
  );
}
