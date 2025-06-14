export interface User {
  readonly name: string;
  readonly lastname: string;
  readonly role: string;
  readonly username: string;
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

export type UserWithRole = User & {
  role: { roleName: string };
  isActive: boolean;
};
