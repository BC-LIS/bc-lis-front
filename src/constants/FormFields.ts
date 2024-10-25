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
    value: "Ansible",
    label: "Ansible",
  },
  {
    value: "Servers",
    label: "Servidores",
  },
  {
    value: "Software installation",
    label: "Instalación de software",
  },
  {
    value: "FOG",
    label: "Free Open Ghost",
  },
  {
    value: "Networks",
    label: "Redes",
  },
  {
    value: "LDAP",
    label: "LDAP",
  },
  {
    value: "PC settings",
    label: "Seguridad",
  },
  {
    value: "Docker",
    label: "Docker",
  },
  {
    value: "Projects",
    label: "Proyectos",
  },
];

export const fileRecievers: InputFielField[] = [
  {
    value: "Administrative",
    label: "Administrativo",
  },
  {
    value: "Programming",
    label: "Programación",
  },
  {
    value: "Both",
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
