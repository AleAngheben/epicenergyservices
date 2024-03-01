export interface AuthData {
  username: string | null;
  name: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
}

export interface lsAuth {
  accessToken: string;
  user: Partial<AuthData>;
}
