import { z } from "zod";

const fileReceivers = ["Programming", "Administrative", "Both"] as const;

const fileStates = ["PUBLISHED", "ARCHIVED", "DRAFT"] as const;

export const formFile = z.object({
  name: z.string(),
  description: z
    .string()
    .min(12, { message: "La descripción del archivo es corta" }),
  typeName: z.enum(fileReceivers, {
    message: "El archivo no tiene un tipo válido",
  }),
  categories: z
    .array(z.string())
    .min(1, { message: "Debe seleccionar al menos una categoría" }),
  state: z.enum(fileStates, {
    message: "El estado del archivo no es válido",
  }),
  username: z.string().min(3, { message: "El autor del archivo no es válido" }),
  file: z.instanceof(File, {
    message: "El archivo no es válido",
  }),
});

export type FileRegisterFormSchema = z.infer<typeof formFile>;
