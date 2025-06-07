export interface User {
  name: string;
  lastname: string;
  role: string;
  username: string;
}

export interface UserWithEmail {
  username: string;
  name: string;
  email: string;
  lastName: string;
}

export type FetchUsersParams = {
  page: number;
  size: number;
  name?: string;
  role?: string;
  isActive?: string;
};
