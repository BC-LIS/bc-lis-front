import { z } from "zod";

export const formUserRegister = z
  .object({
    name: z.string().min(3, { message: "El nombre es corto" }),
    lastname: z.string().min(3, { message: "El apellido es corto" }),
    username: z.string().min(3, { message: "El nombre de usuario incorrecto" }),
    password: z.string().min(8, { message: "La contraseña es débil" }),
    email: z.string().email({ message: "El correo no es válido" }),
    role: z.enum(["ADMIN", "TECHNICAL", "GENERIC"], {
      message: "El rol no es válido",
    }),
  })
  .refine(
    (data) => {
      const expectedEmail = `${data.username}@udea.edu.co`;
      return data.email === expectedEmail;
    },
    {
      path: ["email"],
      message:
        "El correo debe ser institucional y coincidir con el nombre de usuario (usuario@udea.edu.co)",
    }
  );

export type UserRegisterFormSchema = z.infer<typeof formUserRegister>;

// Schema para el inicio de sesión
export const formUserLogin = z.object({
  username: z.string().min(3, { message: "Nombre de usuario es obligatorio" }),
  password: z.string().min(6, { message: "La contraseña es obligatorio" }),
});

export type UserLoginFormSchema = z.infer<typeof formUserLogin>;
