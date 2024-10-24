import { z } from "zod";

const fileCategories = [
  "SERVIDORES",
  "COMPUTADORAS",
  "REDES",
  "BASE_DE_DATOS",
  "SEGURIDAD",
  "Docker",
  "servers",
  "string",
] as const;

const fileReceivers = ["programming", "administrative", "both"] as const;

const fileStates = ["PUBLISHED", "ARCHIVED", "DRAFT"] as const;

export const formFile = z.object({
  name: z.string().min(3, { message: "El nombre del archivo es corto" }),
  description: z
    .string()
    .min(12, { message: "La descripción del archivo es corta" }),
  typeName: z.enum(fileReceivers, {
    message: "El archivo no tiene un tipo válido",
  }),
  categories: z.enum(fileCategories, {
    message: "La categoría no es válida",
  }),
  state: z.enum(fileStates, {
    message: "El estado del archivo no es válido",
  }),
  username: z.string().min(3, { message: "El autor del archivo es corto" }),
  file: z.instanceof(File, {
    message: "El archivo no es válido",
  }),
});

export type FileRegisterFormSchema = z.infer<typeof formFile>;
