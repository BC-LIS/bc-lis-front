import {
  InputFileField,
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

export const fileFields: InputFileField[] = [
  {
    name: "name",
    label: "Nombre del archivo",
    placeholder: "Configuración de red",
    type: "text",
  },
  {
    name: "username",
    label: "Autor",
    placeholder: "Fulano Fulanita",
    type: "text",
  },
  {
    name: "description",
    label: "Descripción",
    placeholder: "Describe brevemente el contenido del archivo",
    type: "textarea",
  },
  {
    name: "categories",
    label: "Categoría",
    placeholder: "Seleccione el tópico del archivo",
    type: "select",
    options: [
      "SERVIDORES",
      "COMPUTADORAS",
      "REDES",
      "BASE_DE_DATOS",
      "SEGURIDAD",
      "Docker",
      "servers",
      "string",
    ],
  },
  {
    name: "typeName",
    label: "Para quién",
    placeholder: "A quién va dirigido el archivo",
    type: "select",
    options: ["programming", "administrative", "both"],
  },
  {
    name: "state",
    label: "Estado del archivo",
    placeholder: "Seleccione el estado del archivo",
    type: "select",
    options: ["PUBLISHED", "ARCHIVED", "DRAFT"],
  },
];
