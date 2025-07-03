import React, { useEffect, useState } from "react";
import TextEditor from "../documents/TextEditor";
import Head from "next/head";
import { useForm } from "react-hook-form";
import {
  DocumentRegisterFormSchema,
  formDocument,
} from "@/schemas/DocumentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getFileAuthor } from "@/lib/getFileAuthor";
import { useRouter } from "next/router";
import {
  fileCategories,
  fileRecievers,
  fileStates,
} from "@/constants/FormFields";
import { toast } from "@/hooks/use-toast";

export default function DocumentForm() {
  const [theme, setTheme] = useState("light");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [author, setAuthor] = useState("");
  const router = useRouter();

  const form = useForm<DocumentRegisterFormSchema>({
    resolver: zodResolver(formDocument),
    defaultValues: {
      name: "",
      description: "",
      typeName: undefined,
      categories: [],
      state: undefined,
      username: "",
      content: "",
      editable: true,
    },
  });

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) setTheme(storedTheme);
    const savedAuthor = getFileAuthor();
    setAuthor(savedAuthor);
    form.setValue("username", savedAuthor);
  }, [form]);

  async function sendData(data: DocumentRegisterFormSchema) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_ENDPOINT}/documents`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("session")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        toast({
          title: "Error ❌",
          description: error?.message ?? "Error al guardar el documento",
        });
        return;
      }

      toast({
        title: "Éxito ✅",
        description: "Documento guardado correctamente",
      });
      router.push("/file");
    } catch {
      toast({
        title: "Error ❌",
        description: "Error en la solicitud",
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
          className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 items-center w-full px-4 sm:px-0"
        >
          <section className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 sm:px-8">
            {/* Nombre */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del documento</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ponle un título" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Autor */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Autor</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={author}
                      readOnly
                      className="font-bold text-foreground"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Descripción */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-1 sm:col-span-2">
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe brevemente el contenido del documento"
                      className="resize-none h-28"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Categorías */}
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem className="col-span-1 sm:col-span-2">
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

            {/* Para quién */}
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
                      {fileRecievers.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Estado */}
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado del documento</FormLabel>
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
                      {fileStates.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
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

          {/* Editor de texto enriquecido */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Escribe el documento</FormLabel>
                <FormControl>
                  <TextEditor
                    theme={theme}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-1 sm:col-span-2 flex justify-end">
            <Button
              type="submit"
              className="w-full sm:w-auto sm:h-10 text-base font-bold bg-primary hover:bg-secondary"
            >
              Guardar documento
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
