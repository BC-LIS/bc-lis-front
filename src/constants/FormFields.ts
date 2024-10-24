import {
  InputFielField,
  InputLoginField,
  InputRegisterField,
} from "@/types/InputTypes";
import { LockKeyhole, User } from "lucide-react";

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

export const loginFields: InputLoginField[] = [
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

export const fileCategories: InputFielField[] = [
  {
    value: "SERVERS",
    label: "Servidores",
  },
  {
    value: "COMPUTERS",
    label: "Computadoras",
  },
  {
    value: "NETWORKS",
    label: "Redes",
  },
  {
    value: "DATABASES",
    label: "Base de datos",
  },
  {
    value: "SECURITY",
    label: "Seguridad",
  },
  {
    value: "DOCKER",
    label: "Docker",
  },
];

export const fileRecievers: InputFielField[] = [
  {
    value: "programming",
    label: "Programación",
  },
  {
    value: "administrative",
    label: "Administrativo",
  },
  {
    value: "both",
    label: "Ambos",
  },
];

export const fileStates: InputFielField[] = [
  {
    value: "PUBLISHED",
    label: "Publicado",
  },
  {
    value: "ARCHIVED",
    label: "Archivado",
  },
  {
    value: "DRAFT",
    label: "Borrador",
  },
];
