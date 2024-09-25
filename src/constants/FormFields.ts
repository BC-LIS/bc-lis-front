import { LockKeyhole, User } from "lucide-react";

type InputRegisterField = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  description: string;
};

export const registerFields: InputRegisterField[] = [
  {
    name: "name",
    label: "Nombre",
    placeholder: "Fulano",
    type: "text",
    description: "Ingresa tu nombre",
  },
  {
    name: "lastname",
    label: "Apellido",
    placeholder: "Fulanita",
    type: "text",
    description: "Ingresa tu apellido",
  },
  {
    name: "username",
    label: "Nombre de usuario",
    placeholder: "fulanito.fulanita",
    type: "text",
    description: "Ingresa un nombre de usuario",
  },
  {
    name: "password",
    label: "Contraseña",
    placeholder: "••••••••",
    type: "password",
    description: "Al menos 8 caracteres",
  },
  {
    name: "email",
    label: "Correo",
    placeholder: "fulano.fulanita@udea.edu.co",
    type: "email",
    description: "Ingresa un correo válido",
  },
];

export const loginFields = [
  {
    name: "username",
    label: "Nombre de usuario",
    placeholder: "fulanito.fulanita",
    type: "text",
    icon: User,
  },
  {
    name: "password",
    label: "Contraseña",
    placeholder: "••••••••",
    type: "password",
    icon: LockKeyhole,
  },
];
