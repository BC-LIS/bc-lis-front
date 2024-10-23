import { z } from "zod";

const fileCategories = [
  "SERVIDORES",
  "COMPUTADORAS",
  "REDES",
  "BASE_DE_DATOS",
  "SEGURIDAD",
  "SISTEMAS_OPERATIVOS",
  "PROGRAMACIÓN",
  "OTROS",
] as const;

const fileReceivers = [
  "ADMINISTRATIVO",
  "TÉCNICO",
  "DOCENTE",
  "ESTUDIANTE",
] as const;

const fileStates = ["PUBLICADO", "BORRADOR", "ARCHIVADO"] as const;

export const formFile = z.object({
  fileName: z.string().min(3, { message: "El nombre del archivo es corto" }),
  fileDescription: z
    .string()
    .min(12, { message: "La descripción del archivo es corta" }),
  fileReceiver: z.enum(fileReceivers, {
    message: "El archivo no tiene un tipo válido",
  }),
  category: z.enum(fileCategories, {
    message: "La categoría no es válida",
  }),
  fileState: z.enum(fileStates, {
    message: "El estado del archivo no es válido",
  }),
  fileAuthor: z.string().min(3, { message: "El autor del archivo es corto" }),
});

export type FileRegisterFormSchema = z.infer<typeof formFile>;
