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
import { formUserRegister, UserRegisterFormSchema } from "@/schemas/UserSchema";
import { inputFields } from "@/constants/FormFields";

function RegisterForm() {
  const ENDPOINT_REGISTER = process.env.NEXT_PUBLIC_API_URL_REGISTER;
  const { toast } = useToast();

  const form = useForm<UserRegisterFormSchema>({
    resolver: zodResolver(formUserRegister),
    defaultValues: {
      name: "",
      lastname: "",
      username: "",
      password: "",
      email: "",
    },
  });

  async function onSubmit(data: UserRegisterFormSchema) {
    try {
      const response = await fetch(`${ENDPOINT_REGISTER}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("session")}`,
        },
      });

      if (!response.ok) {
        toast({
          title: "Error ❌",
          description: "Ha ocurrido un error al registrar el usuario",
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
        description: `Ha ocurrido un error en la solicitud`,
      });
    }
  }
  return (
    <div className="border border-foreground rounded-lg p-8 my-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 items-center gap-4"
        >
          {inputFields.map((input, index) => (
            <FormField
              key={index}
              control={form.control}
              name={input.name as keyof UserRegisterFormSchema}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{input.label}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
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
          <Button
            type="submit"
            className="col-span-2"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Enviando..." : "Registrar Usuario"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default RegisterForm;
