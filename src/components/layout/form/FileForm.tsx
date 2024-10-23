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
import Head from "next/head";
import { Textarea } from "@/components/ui/textarea";
import { SelectInput } from "@/components/ui/select-file-input";

export default function FileForm() {
  const router = useRouter();
  const ENDPOINT_LOGIN = process.env.NEXT_PUBLIC_API_URL_LOGIN;

  const form = useForm<FileRegisterFormSchema>({
    resolver: zodResolver(formFile),
    defaultValues: {
      fileName: "",
      fileDescription: "",
      fileReceiver: undefined,
      category: undefined,
      fileState: undefined,
      fileAuthor: "",
    },
  });

  async function sendData(data: FileRegisterFormSchema) {
    try {
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
      <Head>
        <title>Gestión de documentos | BCLIS</title>
      </Head>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(sendData)}
          className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 items-center"
        >
          {fileFields.map((input, index) => (
            <FormField
              key={index}
              control={form.control}
              name={input.name as keyof FileRegisterFormSchema}
              render={({ field }) => (
                <FormItem
                  className={input.type === "textarea" ? "col-span-2" : ""}
                >
                  <FormLabel>{input.label}</FormLabel>

                  {input.type === "textarea" && (
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={input.placeholder}
                        value={field.value || ""}
                        className="resize-none h-24"
                      />
                    </FormControl>
                  )}
                  {input.type === "select" && input.options && (
                    <FormControl>
                      <SelectInput field={field} options={input.options} />
                    </FormControl>
                  )}
                  {input.type === "text" && (
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={input.placeholder}
                        value={field.value || ""}
                      />
                    </FormControl>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <div className="flex justify-center items-center">
            <Button
              type="submit"
              className="sm:h-10 text-base font-bold bg-primary hover:bg-secondary flex justify-center items-center"
            >
              Guardar archivo
            </Button>
          </div>

          <Input
            type="file"
            name="fileType"
            className="bg-transparent border border-primary"
            id="file"
          />
        </form>
      </Form>
    </>
  );
}
