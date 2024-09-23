import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { adminOptions, techOptions } from "@/constants/UserOptions";
import { LogOut, Settings, User } from "lucide-react";

// Función para obtener las opciones basadas en el rol del usuario
const getOptionsByRole = (userRole: string) => {
  switch (userRole) {
    case "ADMIN":
      return adminOptions;
    case "TECHNICAL":
      return techOptions;
    default:
      return [];
  }
};

export const UserInfoDropdown = ({ userRole }: { userRole: string }) => {
  const roleOptions = getOptionsByRole(userRole);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <User className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Renderizar las opciones basadas en el rol */}
        {roleOptions.length > 0 &&
          roleOptions.map((option, index) => (
            <DropdownMenuGroup key={index}>
              <DropdownMenuItem>
                <option.icon className="mr-4 h-4 w-4" />
                <span>{option.label}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          ))}

        {/* Configuración y cierre de sesión disponibles para todos los roles */}
        {userRole !== null && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Settings className="mr-4 h-4 w-4" />
                <span>Configurar perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-4 h-4 w-4" />
                <span>Cerrar Sesion</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
