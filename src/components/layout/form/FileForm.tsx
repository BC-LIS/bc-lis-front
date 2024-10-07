import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { useForm } from "react-hook-form";
import { FileRegisterFormSchema, formFile } from "@/schemas/FileSchema";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/router";
import { fileFields } from "@/constants/FormFields";

export default function FileForm() {
  const router = useRouter();
  const ENDPOINT_LOGIN = process.env.NEXT_PUBLIC_API_URL_LOGIN;

  const form = useForm<FileRegisterFormSchema>({
    resolver: zodResolver(formFile),
    defaultValues: {
      fileName: "",
      fileDescription: "",
    },
  });

  async function sendData(data: FileRegisterFormSchema) {
    try {
      console.log(data);
      const response = await fetch(`${ENDPOINT_LOGIN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast({
          title: "Error ❌",
          description: "Información incorrecta, inténtalo nuevamente.",
        });
        return;
      }

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(sendData)} className="mt-8 space-y-6">
          {fileFields.map((input, index) => (
            <FormField
              key={index}
              control={form.control}
              name={input.name as keyof FileRegisterFormSchema}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{input.label}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder={input.placeholder}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Input
            type="file"
            name="fileType"
            className="bg-transparent border border-primary"
            id="file"
          />

          <div className="flex justify-center items-center">
            <Button
              type="submit"
              className="sm:w-80 sm:h-12 text-base font-bold bg-primary hover:bg-chart-6 flex justify-center items-center"
            >
              Registrar archivo
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
