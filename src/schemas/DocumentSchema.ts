import { z } from "zod";

const fileReceivers = ["Programming", "Administrative", "Both"] as const;

const fileStates = ["PUBLISHED", "ARCHIVED", "DRAFT"] as const;

export const formDocument = z.object({
  name: z.string().min(3, { message: "El nombre del archivo es muy corto" }),
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
  content: z
    .string()
    .min(3, { message: "El contenido del documento es muy corto" }),
  editable: z.literal(true),
});

export type DocumentRegisterFormSchema = z.infer<typeof formDocument>;
