import { create } from "zustand";
import User from "../entities/User";
import { Role } from "../entities/Role";
import { getRoleById } from "../config/api";

// Định nghĩa trạng thái cho UserStore
interface UserStore {
  account: User;
  isAuthenticated: boolean;
  login: (data: User) => void;
  logout: () => void;
  setRole: (role: Role) => void;
  setAccount: (newAccount: Partial<User>) => void;
  fetchRoles: (id: number) => Promise<void>;
}

// Tạo store với Zustand
export const useUserStore = create<UserStore>((set) => {
  // Lấy thông tin người dùng từ localStorage (nếu có)
  const storedUser = localStorage.getItem("user");
  const parsedUser: User | null = storedUser ? JSON.parse(storedUser) : null;

  const defaultRole: Role = {
    id: "",
    name: "",
    description: "",
    active: false,
    permissions: [],
    createdBy: "",
    isDeleted: false,
    deletedAt: null,
    createdAt: "",
    updatedAt: "",
  };

  return {
    account: parsedUser || {
      id: "",
      access_token: "",
      refresh_token: "",
      email: "",
      name: "",
      phoneNumber: "",
      birthday: "",
      address: "",
      role: defaultRole,
      image: "",
    },
    isAuthenticated: !!parsedUser,
    login: (data: User) => {
      // Lưu trữ dữ liệu người dùng vào localStorage
      localStorage.setItem("user", JSON.stringify(data));
      set({ account: data, isAuthenticated: true });
    },
    logout: () => {
      // Xóa dữ liệu người dùng khỏi localStorage
      localStorage.removeItem("user");
      set({
        account: {
          id: "",
          access_token: "",
          refresh_token: "",
          email: "",
          name: "",
          phoneNumber: "",
          birthday: "",
          address: "",
          role: defaultRole,
          image: "",
        },
        isAuthenticated: false,
      });
    },
    setRole: (role: Role) => {
      // Cập nhật role mới cho account
      set((state) => {
        const updatedAccount = { ...state.account, role };
        localStorage.setItem("user", JSON.stringify(updatedAccount));
        return { account: updatedAccount };
      });
    },
    fetchRoles: async (id: number) => {
      try {
        const response = await getRoleById(id);
        const role = response.data;
        set((state) => {
          const updatedAccount = { ...state.account, role };
          localStorage.setItem("user", JSON.stringify(updatedAccount));
          return { account: updatedAccount };
        });
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    },
    setAccount: (newAccount: Partial<User>) => {
      set((state) => {
        const updatedAccount = { ...state.account, ...newAccount };
        localStorage.setItem("user", JSON.stringify(updatedAccount));
        return { account: updatedAccount };
      });
    },
  };
});
