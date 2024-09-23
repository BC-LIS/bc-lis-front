import { z } from "zod";

export const formUserRegister = z.object({
  name: z.string().min(3, { message: "El nombre es corto" }),
  lastname: z.string().min(3, { message: "El apellido es corto" }),
  username: z.string().min(3, { message: "El nombre de usuario incorrecto" }),
  password: z.string().min(8, { message: "La contraseña es débil" }),
  email: z.string().email({ message: "El correo no es válido" }),
  role: z.enum(["ADMIN", "TECHNICAL", "GENERIC"], {
    message: "El rol no es válido",
  }),
});

export type UserRegisterFormSchema = z.infer<typeof formUserRegister>;

// Schema para el inicio de sesión
export const formUserLogin = z.object({
  username: z.string().min(3, { message: "Nombre de usuario incorrecto" }),
  password: z.string().min(8, { message: "La contraseña es incorrecta" }),
});

export type UserLoginFormSchema = z.infer<typeof formUserLogin>;
