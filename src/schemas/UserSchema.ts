import { z } from "zod";

export const formUser = z.object({
  name: z.string().min(3, { message: "El nombre es corto" }),
  lastname: z.string().min(3, { message: "El apellido es corto" }),
  password: z.string().min(8, { message: "La contraseña es débil" }),
  email: z.string().email({ message: "El correo no es válido" }),
  role: z.enum(["ADMIN", "TECHNICAL", "GENERIC"], {
    message: "El rol no es válido",
  }),
});

export type UserFormSchema = z.infer<typeof formUser>;
