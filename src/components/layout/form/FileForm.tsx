import React, { useEffect, useState } from "react";
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
import Head from "next/head";
import Dropzone from "./Dropzone";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/ui/multi-select";
import { getFileAuthor } from "@/lib/getFileAuthor";
import {
  fileCategories,
  fileRecievers,
  fileStates,
} from "@/constants/FormFields";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FileForm() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [author, setAuthor] = useState<string>("");
  const ENDPOINT_DOCUMENT = process.env.NEXT_PUBLIC_API_DOCUMENT_REGISTER;
  const router = useRouter();

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

  useEffect(() => {
    const savedAuthor = getFileAuthor();
    setAuthor(savedAuthor);
    form.setValue("username", savedAuthor);
  }, [form]);

  async function sendData(data: FileRegisterFormSchema) {
    try {
      // Al ser una petición multipart/form-data, se debe enviar un FormData
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("username", data.username);
      formData.append("description", data.description);
      formData.append("typeName", data.typeName);
      formData.append("state", data.state);
      formData.append("categories", JSON.stringify(data.categories));
      formData.append("file", data.file);

      const response = await fetch(`${ENDPOINT_DOCUMENT}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("session")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        toast({
          title: "Error ❌",
          description: "Información incorrecta, inténtalo nuevamente.",
        });
        return;
      }

      // Redirigir al usuario a la página principal de documentos
      router.push("/file");
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
          className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 items-center w-full"
        >
          <section className="grid grid-cols-2 p-2 gap-4 sm:px-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del archivo</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Configuración de red" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Autor</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Fulano Fulanita"
                      value={author}
                      className="font-bold text-foreground"
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe brevemente el tópico del archivo"
                      className="resize-none h-28"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Categorías</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={fileCategories}
                      onValueChange={(values) => {
                        setSelectedCategories(values);
                        field.onChange(values);
                      }}
                      defaultValue={selectedCategories}
                      placeholder="Seleccione las categorías"
                      className="z-50 w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="typeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Para quién</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un rol" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {fileRecievers.map((option, index) => (
                        <SelectItem key={index} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado del archivo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {fileStates.map((option, index) => (
                        <SelectItem key={index} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <aside className="flex flex-col justify-end items-center space-y-8">
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
            <Button
              type="submit"
              className="sm:h-10 text-base font-bold bg-primary hover:bg-secondary"
            >
              Guardar archivo
            </Button>
          </aside>

          <div className=" col-span-2"></div>
        </form>
      </Form>
    </>
  );
}
