export interface User {
  name: string;
  lastname: string;
  role: "GENERIC" | "ADMIN" | "TECHNICAL";
}
