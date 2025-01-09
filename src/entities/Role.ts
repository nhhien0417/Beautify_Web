import { Permission } from "./Permission";

export interface Role {
  id?: string;
  name: string;
  description: string;
  active: boolean;
  permissions: Permission[] | string[];

  createdBy?: string;
  isDeleted?: boolean;
  deletedAt?: boolean | null;
  createdAt?: string;
  updatedAt?: string;
}
