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
import { FileType, LogOut, Settings, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/use-auth";
import { User } from "@/types/UserTypes";
import { formatUserRole } from "@/lib/formatUserRole";

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

export const UserInfoDropdown = ({ user }: { user: User }) => {
  const roleOptions = getOptionsByRole(user.role);
  const { logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <UserIcon className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 sm:w-64 md:w-72 bg-background/95 backdrop-blur-xl border border-primary/30 shadow-lg">

        {/* Mostrar nombre y rol solo en móviles */}
        <DropdownMenuLabel className="text-sm text-muted-foreground sm:hidden">
          <p className="font-semibold text-base text-primary">
            {user.name} {user.lastname}
          </p>
          <p className="text-xs font-medium">
            {formatUserRole(user.role)}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="sm:hidden" />

        {/* Opciones del rol */}
        {roleOptions.length > 0 &&
          roleOptions.map((option, index) => (
            <DropdownMenuGroup key={index}>
              <DropdownMenuItem className="p-2 md:p-3 text-sm md:text-base hover:bg-primary/10">
                <option.icon className="mr-4 h-4 w-4 md:h-5 md:w-5" />
                <Link href={option.url}>
                  <span>{option.label}</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          ))}

        {/* Comunes */}
        <DropdownMenuItem className="p-2 md:p-3 text-sm md:text-base hover:bg-primary/10">
          <FileType className="mr-4 h-4 w-4 md:h-5 md:w-5" />
          <Link href="/editor">
            <span>Editor de texto</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="p-2 md:p-3 text-sm md:text-base hover:bg-primary/10">
            <Settings className="mr-4 h-4 w-4 md:h-5 md:w-5" />
            <span>Configurar perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={handleLogout}
            className="p-2 md:p-3 text-sm md:text-base hover:bg-primary/10 hover:text-red-500"
          >
            <LogOut className="mr-4 h-4 w-4 md:h-5 md:w-5" />
            <span>Cerrar Sesión</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
