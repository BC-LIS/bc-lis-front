export interface User {
  name: string;
  lastname: string;
  role: string;
  username: string;
  email?: string;
  active: boolean;
}

export interface UserWithEmail {
  username: string;
  name: string;
  email: string;
  lastName: string;
}
