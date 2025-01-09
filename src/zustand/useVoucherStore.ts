import { create } from "zustand";
import Voucher from "../entities/Voucher";
import {
  createVoucher,
  deleteVoucher,
  getAllVouchers,
  restoreVoucher,
  updateVoucher,
} from "../config/api";

interface VoucherStore {
  vouchers: Voucher[];
  singleVoucher: Voucher;
  fetchVouchers: () => Promise<void>;
  addVoucher: (voucher: Voucher) => void;
  editVoucher: (voucher: Voucher) => void;
  removeVoucher: (id: number) => void;
  restoreVoucher: (id: number) => void;
}

const useVoucherStore = create<VoucherStore>((set) => ({
  vouchers: [],
  singleVoucher: {
    id: 0,
    name: "",
    isActive: false,
    isPercentage: false,
    discountValue: 0,
  },

  fetchVouchers: async () => {
    try {
      const response = await getAllVouchers(1, 100);
      const voucherData = response.data.result;

      const mappedVouchers: Voucher[] = voucherData.map((item: any) => ({
        id: item.id,
        name: item.name,
        isActive: item.active,
        isPercentage: item.percentage,
        discountValue: item.discountValue,
      }));

      set({ vouchers: mappedVouchers });
    } catch (error) {
      console.error("Error fetching vouchers data:", error);
    }
  },

  addVoucher: async (voucher) => {
    try {
      const res = await createVoucher(
        voucher.name,
        voucher.discountValue,
        voucher.isPercentage
      );

      const statusCode = (res as unknown as { statusCode: number }).statusCode;
      if (statusCode === 400) {
        alert("Voucher already exists.");
      } else if (statusCode === 200) {
        set((state) => ({
          vouchers: [...state.vouchers, voucher],
        }));
      }
    } catch (error) {
      console.error("Error adding voucher:", error);
    }
  },

  editVoucher: async (voucher) => {
    try {
      const res = await updateVoucher(
        voucher.id,
        voucher.name,
        voucher.discountValue,
        voucher.isPercentage
      );

      const statusCode = (res as unknown as { statusCode: number }).statusCode;
      if (statusCode === 400) {
        alert("Voucher already exists.");
      } else if (statusCode === 200) {
        set((state) => ({
          vouchers: state.vouchers.map((v) =>
            v.id === voucher.id ? { ...v, ...voucher } : v
          ),
        }));
      }
    } catch (error) {
      console.error("Error updating voucher:", error);
    }
  },

  removeVoucher: async (id) => {
    try {
      // Instead of deleting the voucher, just set it as inactive (isActive = false)
      await deleteVoucher(id);

      set((state) => ({
        vouchers: state.vouchers.map((voucher) =>
          voucher.id === id ? { ...voucher, isActive: false } : voucher
        ),
      }));
    } catch (error) {
      console.error("Error removing voucher:", error);
    }
  },

  restoreVoucher: async (id) => {
    try {
      // Instead of restoring the voucher, set it as active (isActive = true)
      await restoreVoucher(id);

      set((state) => ({
        vouchers: state.vouchers.map((voucher) =>
          voucher.id === id ? { ...voucher, isActive: true } : voucher
        ),
      }));
    } catch (error) {
      console.error("Error restoring voucher:", error);
    }
  },
}));

export default useVoucherStore;
