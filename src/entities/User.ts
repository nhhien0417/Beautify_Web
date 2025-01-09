import { Role } from "./Role";

export default interface User {
  id: string;
  access_token: string;
  refresh_token: string;
  email: string;
  name: string;
  phoneNumber: string;
  birthday?: string;
  address: string;
  role: Role;
  image: string;
}
