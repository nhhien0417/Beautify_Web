import { create } from "zustand";
import { getAllRoles, getRoleById } from "../config/api";
import { Role } from "../entities/Role";

interface IState {
  isFetching: boolean;
  meta: {
    page: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: Role[];
  isFetchSingle: boolean;
  singleRole: Role;
  fetchRoles: () => Promise<void>;
  fetchRoleById: (id: string) => Promise<void>;
  resetSingleRole: (name: string) => void;
}

const useRoleStore = create<IState>((set) => ({
  // Initial state
  isFetching: true,
  isFetchSingle: true,
  meta: {
    page: 1,
    pageSize: 10,
    pages: 0,
    total: 0,
  },
  result: [],
  singleRole: {
    id: "",
    name: "",
    description: "",
    active: false,
    permissions: [],
  },

  // Fetch roles
  fetchRoles: async () => {
    set({ isFetching: true });
    try {
      const response = await getAllRoles(1, 100);
      if (response && response.data) {
        set({
          isFetching: false,
          meta: response.data.meta,
          result: response.data.result,
        });
      } else {
        set({ isFetching: false, result: [] }); // Xử lý khi không có dữ liệu
      }
    } catch (error) {
      console.error("Failed to fetch roles:", error);
      set({ isFetching: false });
    }
  },

  // Fetch role by ID
  fetchRoleById: async (id: string) => {
    set({
      isFetchSingle: true,
      singleRole: {
        id: "",
        name: "",
        description: "",
        active: false,
        permissions: [],
      },
    });
    try {
      const response = await getRoleById(+id);
      if (response && response.data) {
        set({
          isFetchSingle: false,
          singleRole: response.data,
        });
      } else {
        set({ isFetchSingle: false });
      }
    } catch (error) {
      console.error("Failed to fetch role by ID:", error);
      set({
        isFetchSingle: false,
        singleRole: {
          id: "",
          name: "",
          description: "",
          active: false,
          permissions: [],
        },
      });
    }
  },

  // Reset single role
  resetSingleRole: () =>
    set({
      singleRole: {
        id: "",
        name: "",
        description: "",
        active: false,
        permissions: [],
      },
    }),
}));

export default useRoleStore;
