import { toast } from "@/hooks/use-toast";
import { FetchUsersParams, User } from "@/types/UserTypes";

type ToggleUserStatusParams = {
  user: User & {
    role: { roleName: string };
    isActive: boolean;
  };
  fetchUsersCallback: () => void;
};

const ENDPOINT_DEACTIVATE = process.env.NEXT_PUBLIC_API_URL_DEACTIVATE_USER;
const ENDPOINT_USERS = process.env.NEXT_PUBLIC_API_URL_USERS;
const ENDPOINT_CHANGE_PASSWORD =
  process.env.NEXT_PUBLIC_API_URL_CHANGE_PASSWORD;
const ENDPOINT_CHANGE_ROLE = process.env.NEXT_PUBLIC_API_URL_CHANGE_ROLE;

export const changeUserStatus = async ({
  username,
  isActive,
  token,
  onSuccess,
}: {
  username: string;
  isActive: boolean;
  token: string | null;
  onSuccess?: () => void;
}) => {
  try {
    const params = new URLSearchParams({
      username,
      isActive: isActive.toString(),
    });

    const response = await fetch(`${ENDPOINT_DEACTIVATE}?${params}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      toast({
        title: "Error ❌",
        description: "No se pudo cambiar el estado del usuario.",
      });
    }

    toast({
      title: "Éxito ✅",
      description: `El usuario fue ${
        isActive ? "activado" : "desactivado"
      } correctamente.`,
    });

    onSuccess?.();
  } catch (error) {
    toast({
      title: "Error ❌",
      description: (error as Error).message,
    });
  }
};

export const toggleUserStatus = async ({
  user,
  fetchUsersCallback,
}: ToggleUserStatusParams) => {
  const token = localStorage.getItem("session");
  const isRoleAllowed = ["GENERIC", "TECHNICAL"].includes(user.role.roleName);

  if (!isRoleAllowed) {
    toast({
      title: "Error ❌",
      description: "No tienes permisos para cambiar el estado de este usuario",
    });
    return;
  }

  await changeUserStatus({
    username: user.username,
    isActive: !user.isActive,
    token,
    onSuccess: () => {
      fetchUsersCallback();
      toast({
        title: "Éxito ✅",
        description: `Usuario ${user.username} ${
          user.isActive ? "desactivado" : "activado"
        } correctamente`,
      });
    },
  });
};

export const fetchUsers = async ({
  page,
  size,
  name,
  role,
  isActive,
}: FetchUsersParams) => {
  const token = localStorage.getItem("session");

  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  if (name) params.append("name", name);
  if (role) params.append("role", role);
  if (isActive !== undefined && isActive !== "") {
    params.append("isActive", isActive);
  }

  try {
    const response = await fetch(`${ENDPOINT_USERS}?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      toast({
        title: "Error ❌",
        description: "Ha ocurrido un error al obtener los usuarios",
      });
      return null;
    }

    return response.json();
  } catch (error) {
    toast({
      title: "Error ❌",
      description: "Ha ocurrido un error en la solicitud",
    });
    return null;
  }
};

export const changePassword = async ({
  oldPassword,
  newPassword,
  onSuccess,
}: {
  oldPassword: string;
  newPassword: string;
  onSuccess?: () => void;
}) => {
  const token = localStorage.getItem("session");

  const params = new URLSearchParams({
    oldPassword,
    newPassword,
  });

  try {
    const response = await fetch(
      `${ENDPOINT_CHANGE_PASSWORD}?${params.toString()}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      toast({
        title: "Error ❌",
        description: "Error al cambiar la contraseña.",
      });
    }

    toast({
      title: "Contraseña actualizada ✅",
      description: "Tu contraseña ha sido modificada correctamente.",
    });

    onSuccess?.();
  } catch (error) {
    toast({
      title: "Error ❌",
      description: "No se pudo cambiar la contraseña.",
    });
  }
};

export const changeUserRole = async ({
  username,
  newRoleName,
}: {
  username: string;
  newRoleName: string;
}) => {
  try {
    const token = localStorage.getItem("session");
    const response = await fetch(
      `${ENDPOINT_CHANGE_ROLE}?username=${username}&newRoleName=${newRoleName}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.ok;
  } catch (error) {
    return false;
  }
};
