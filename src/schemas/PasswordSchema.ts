import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "La contraseña actual debe tener al menos 8 caracteres",
    }),
    newPassword: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
      .regex(/[A-Z]/, {
        message: "Debe contener al menos una letra mayúscula",
      })
      .regex(/[0-9]/, {
        message: "Debe contener al menos un número",
      })
      .regex(/[\W_]/, {
        message: "Debe contener al menos un símbolo",
      }),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    path: ["newPassword"],
    message: "La nueva contraseña debe ser diferente a la actual",
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
