export const getDisplayRoleName = (role: string) => {
  switch (role) {
    case "ADMIN":
      return "Administrador";
    case "TECHNICAL":
      return "Técnico";
    case "GENERIC":
      return "Normal";
    default:
      return role;
  }
};
