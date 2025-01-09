export default interface Voucher {
  id: number;
  name: string;
  isActive: boolean;
  isPercentage: boolean;
  discountValue: number;
}
