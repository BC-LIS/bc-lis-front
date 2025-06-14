import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { changeUserRole, toggleUserStatus } from "@/lib/userServices";
import { UserWithRole } from "@/types/UserTypes";
import { getDisplayRoleName } from "@/utils/DisplayRole";

function UserActions({
  user,
  currentUserRole,
  refreshUsers,
}: {
  user: UserWithRole;
  currentUserRole: string;
  refreshUsers: () => void;
}) {
  const handleToggleStatus = () => {
    toggleUserStatus({
      user,
      fetchUsersCallback: refreshUsers,
    });
  };

  const handleChangeRole = async () => {
    const nextRole =
      user.role.roleName === "TECHNICAL" ? "GENERIC" : "TECHNICAL";

    const success = await changeUserRole({
      username: user.username,
      newRoleName: nextRole,
    });

    if (success) {
      refreshUsers();
    } else {
      toast({
        title: "Error ❌",
        description: "No tienes permisos para cambiar el rol",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menú</span>⋮
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={handleToggleStatus}
          className={user.isActive ? "text-destructive" : "text-udea-950"}
        >
          {user.isActive ? "Desactivar" : "Activar"}
        </DropdownMenuItem>

        {currentUserRole === "ADMIN" && user.role.roleName !== "ADMIN" && (
          <DropdownMenuItem onClick={handleChangeRole}>
            Cambiar rol a{" "}
            {getDisplayRoleName(
              user.role.roleName === "TECHNICAL" ? "GENERIC" : "TECHNICAL"
            )}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserActions;
