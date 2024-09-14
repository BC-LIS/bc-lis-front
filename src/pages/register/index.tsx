"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { formUser, UserFormSchema } from "@/schemas/UserSchema";
import { inputFields } from "@/constants/FormFields";

export default function RegisterPage() {
  const { toast } = useToast();

  const form = useForm<UserFormSchema>({
    resolver: zodResolver(formUser),
    defaultValues: {
      name: "",
      lastname: "",
      password: "",
      email: "",
      role: undefined,
    },
  });

  async function onSubmit(data: UserFormSchema) {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        toast({
          title: "Error ❌",
          description: `Ha ocurrido un error al registrar el usuario`,
        });
      } else {
        toast({
          title: "Usuario registrado ✅",
          description: `El usuario con nombre ${data.name} ha sido registrado`,
        });
      }
    } catch (error) {
      toast({
        title: "Error ❌",
        description: `Ha ocurrido un error en la solicitud: ${error}`,
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-2 gap-4 sm:p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 items-center gap-4"
        >
          {inputFields.map((input, index) => (
            <FormField
              key={index}
              control={form.control}
              name={input.name as keyof UserFormSchema}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{input.label}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={input.placeholder}
                      type={input.type}
                      icon=""
                    />
                  </FormControl>
                  <FormDescription>{input.description}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Elegir rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Administrador</SelectItem>
                      <SelectItem value="TECHNICAL">Técnico</SelectItem>
                      <SelectItem value="GENERIC">Genérico</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Selecciona un rol</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Registrar</Button>
        </form>
      </Form>
    </div>
  );
}
