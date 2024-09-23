export function formatUserRole(role: string): string {
  switch (role) {
    case "ADMIN":
      return "Administrador";
    case "TECHNICAL":
      return "Técnico";
    case "GENERIC":
      return "Genérico";
    default:
      return "Genérico";
  }
}
