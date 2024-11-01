// utils/badgeUtils.ts
export const getBadgeVariant = (state: string) => {
  switch (state) {
    case "PUBLISHED":
      return "default"; // Verde para documentos publicados
    case "DRAFT":
      return "warning"; // Amarillo para borradores
    case "ARCHIVED":
      return "destructive"; // Rojo para documentos archivados
    default:
      return "default";
  }
};
