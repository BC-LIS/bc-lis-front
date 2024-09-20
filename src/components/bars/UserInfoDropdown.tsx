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
import { LogIn, LogOut, Settings, User } from "lucide-react";
import { logout } from "@/lib/LoginService";

export const UserInfoDropdown = ({
  userRole,
}: {
  userRole: "Genérico" | "Administrador" | "Técnico" | null;
}) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <User className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Opciones</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {userRole === null && (
            <DropdownMenuItem>
              <LogIn className="mr-4 h-4 w-4" />
              <span>Iniciar Sesion</span>
            </DropdownMenuItem>
          )}

          {userRole === "Administrador" &&
            adminOptions.map((option, index) => (
              <DropdownMenuGroup key={index}>
                <DropdownMenuItem>
                  <option.icon className="mr-4 h-4 w-4" />
                  <span>{option.label}</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            ))}

          {userRole === "Técnico" &&
            techOptions.map((option, index) => (
              <DropdownMenuGroup key={index}>
                <DropdownMenuItem>
                  <option.icon className="mr-4 h-4 w-4" />
                  <span>{option.label}</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            ))}

          {userRole !== null && (
            <DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-4 h-4 w-4" />
                <span>Configurar perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  await logout();
                }}
              >
                <LogOut className="mr-4 h-4 w-4" />
                <span>Cerrar Sesion</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
