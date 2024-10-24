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
import Dropzone from "./Dropzone";

export default function FileForm() {
  const router = useRouter();
  const ENDPOINT_DOCUMENT = process.env.NEXT_PUBLIC_API_DOCUMENT_REGISTER;

  const form = useForm<FileRegisterFormSchema>({
    resolver: zodResolver(formFile),
    defaultValues: {
      name: "",
      description: "",
      typeName: undefined,
      categories: undefined,
      state: undefined,
      username: "",
      file: undefined,
    },
  });

  async function sendData(data: FileRegisterFormSchema) {
    try {
      // Al ser una petición multipart/form-data, se debe enviar un FormData
      const formData = new FormData();
      console.log(formData);

      const categories = Array.isArray(data.categories)
        ? data.categories
        : [data.categories];

      const jsonData = JSON.stringify({
        name: data.name,
        description: data.description,
        typeName: data.typeName,
        categories: categories,
        state: data.state,
        username: data.username,
      });

      formData.append("data", jsonData);

      // Añadir el archivo
      if (data.file) {
        formData.append("file", data.file);
      }

      const response = await fetch(`${ENDPOINT_DOCUMENT}`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("session")}`,
        },
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
                        className="resize-none h-24"
                        value={
                          typeof field.value === "string" ? field.value : ""
                        }
                      />
                    </FormControl>
                  )}
                  {input.type === "select" && input.options && (
                    <FormControl>
                      <SelectInput
                        field={field}
                        options={input.options}
                        placeholder={input.placeholder}
                      />
                    </FormControl>
                  )}
                  {input.type === "text" && (
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={input.placeholder}
                        value={
                          typeof field.value === "string" ? field.value : ""
                        }
                      />
                    </FormControl>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {/* Dropzone para el archivo */}
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormControl>
                  <Dropzone field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center items-center col-span-2">
            <Button
              type="submit"
              className="sm:h-10 text-base font-bold bg-primary hover:bg-secondary flex justify-center items-center"
            >
              Guardar archivo
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
