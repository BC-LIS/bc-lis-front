import { z } from "zod";

export const formFile = z.object({
  fileName: z.string().min(3, { message: "El nombre del archivo es corto" }),
  fileDescription: z
    .string()
    .min(12, { message: "La descripción del archivo es corta" }),
  fileType: z.string().refine(
    (value) => {
      // Expresiones regulares para comprobar extensiones permitidas
      const allowedExtensions = /\.(pdf|doc|docx|xls|xlsx|png|jpg|jpeg)$/i;
      return allowedExtensions.test(value);
    },
    {
      message: "Solo se permiten PDF, Word, Excel, PNG y JPG.",
    }
  ),
});

export type FileRegisterFormSchema = z.infer<typeof formFile>;
