import { create } from "zustand";
import { getAllPermissions, getAllPermissionsNotDelete } from "../config/api";
import { Permission } from "../entities/Permission";

interface IState {
  isFetching: boolean;
  allPermissions: Permission[]; // Toàn bộ permissions
  metaAll: {
    page: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  activePermissions: Permission[]; // Chỉ những permission chưa bị xóa
  metaActive: {
    page: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  fetchAllPermissions: () => Promise<void>;
  fetchActivePermissions: () => Promise<void>;
  refreshPermissions: () => Promise<void>;
}

const usePermissionStore = create<IState>((set) => ({
  isFetching: false,
  allPermissions: [],
  activePermissions: [],
  metaAll: {
    page: 1,
    pageSize: 100,
    pages: 0,
    total: 0,
  },
  metaActive: {
    page: 1,
    pageSize: 100,
    pages: 0,
    total: 0,
  },
  fetchAllPermissions: async () => {
    set({ isFetching: true });
    try {
      const response = await getAllPermissions(1, 100);
      if (response?.data) {
        set({
          allPermissions: response.data.result,
          metaAll: response.data.meta, // Cập nhật metaAll từ response
        });
      }
    } catch (error) {
      console.error("Error fetching all permissions:", error);
    } finally {
      set({ isFetching: false });
    }
  },

  fetchActivePermissions: async () => {
    set({ isFetching: true });
    try {
      const response = await getAllPermissionsNotDelete(1, 100);
      if (response?.data) {
        set({
          activePermissions: response.data.result,
          metaActive: response.data.meta, // Cập nhật metaActive từ response
        });
      }
    } catch (error) {
      console.error("Error fetching active permissions:", error);
    } finally {
      set({ isFetching: false });
    }
  },

  refreshPermissions: async () => {
    await Promise.all([
      usePermissionStore.getState().fetchAllPermissions(),
      usePermissionStore.getState().fetchActivePermissions(),
    ]);
  },
}));

export default usePermissionStore;
