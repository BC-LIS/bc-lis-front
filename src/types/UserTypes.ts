export interface User {
  name: string;
  lastname: string;
  role: "Genérico" | "Administrador" | "Técnico" | null;
}
