import { UserRole } from "./userRole";

export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: UserRole;
};
