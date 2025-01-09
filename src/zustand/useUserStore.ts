import { create } from "zustand";
import User from "../entities/User";

// Định nghĩa trạng thái cho UserStore
interface UserStore {
  account: User;
  isAuthenticated: boolean;
  login: (data: User) => void;
  logout: () => void;
  setAccount: (newAccount: Partial<User>) => void;
}

// Tạo store với Zustand
export const useUserStore = create<UserStore>((set) => {
  const storedUser = localStorage.getItem("user");
  const parsedUser: User | null = storedUser ? JSON.parse(storedUser) : null;

  return {
    account: parsedUser || {
      id: "",
      email: "",
      name: "",
      phoneNumber: "",
      birthday: "",
      address: "",
      image: "",
    },
    isAuthenticated: !!parsedUser,
    login: (data: User) => {
      // Lưu trữ dữ liệu người dùng vào localStorage
      localStorage.setItem("user", JSON.stringify(data));
      set({ account: data, isAuthenticated: true });
    },
    logout: () => {
      localStorage.removeItem("user");
      set({
        account: {
          id: "",
          email: "",
          name: "",
          phoneNumber: "",
          birthday: "",
          address: "",
          image: "",
        },
        isAuthenticated: false,
      });
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
