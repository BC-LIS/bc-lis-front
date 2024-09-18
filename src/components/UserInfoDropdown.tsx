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
import { FolderCog, LogOut, Settings, User, UserRoundCog } from "lucide-react";

export const UserInfoDropdown = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="flex justify-center items-center"
        >
          <Button variant="outline" size="icon">
            <User className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Opciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <UserRoundCog className="mr-4 h-4 w-4" />
              <span>Gestionar usuarios</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FolderCog className="mr-4 h-4 w-4" />
              <span>Gestionar documentos</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Settings className="mr-4 h-4 w-4" />
              <span>Configurar</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-4 h-4 w-4" />
              <span>Cerrar Sesion</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
