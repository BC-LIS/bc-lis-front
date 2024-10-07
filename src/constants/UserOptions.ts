import { UserCog, FolderCog } from "lucide-react";

export const adminOptions = [
  {
    label: "Gestionar usuarios",
    url: "/account/register",
    icon: UserCog,
  },
  {
    label: "Gestionar documentos",
    url: "/file/register",
    icon: FolderCog,
  },
];

export const techOptions = [
  {
    label: "Gestionar documentos",
    url: "/file/register",
    icon: FolderCog,
  },
];
