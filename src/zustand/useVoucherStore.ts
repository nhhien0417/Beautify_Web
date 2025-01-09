import { create } from "zustand";
import Voucher, { sampleVouchers } from "../entities/Voucher";

interface VoucherStore {
  vouchers: Voucher[];
  singleVoucher: Voucher;
}

const useVoucherStore = create<VoucherStore>(() => ({
  vouchers: sampleVouchers,
  singleVoucher: {
    id: 0,
    name: "",
    isActive: false,
    isPercentage: false,
    discountValue: 0,
  },
}));

export default useVoucherStore;
