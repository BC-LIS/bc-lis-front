import { z } from "zod";

export const generalInfoSchema = z.object({
  name: z.string().min(3, { message: "El nombre es muy corto" }),
  lastname: z.string().min(3, { message: "El apellido es muy corto" }),
});

export type GeneralInfoSchema = z.infer<typeof generalInfoSchema>;
