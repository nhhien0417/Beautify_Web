export default interface Voucher {
  id: number;
  name: string;
  isActive: boolean;
  isPercentage: boolean;
  discountValue: number;
}

export const sampleVouchers: Voucher[] = [
  {
    id: 1,
    name: "Max Sale",
    isActive: true,
    isPercentage: true,
    discountValue: 50,
  },
  {
    id: 2,
    name: "Black Friday",
    isActive: true,
    isPercentage: false,
    discountValue: 30,
  },
  {
    id: 3,
    name: "Black Monday",
    isActive: true,
    isPercentage: true,
    discountValue: 20,
  },
];
