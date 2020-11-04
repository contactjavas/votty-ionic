export interface UserData {
  token: string;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface LoginData {
  email: string;
  password: string;
}
