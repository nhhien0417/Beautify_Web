import Voucher from "../entities/Voucher";

export default interface SaleTicket {
  id: string;
  total: number;
  date: string;
  status: string;
  discount?: Voucher;
  listProducts: Array<{
    product: {
      unitPrice: number;
      productImage: string;
      name: string;
    };
    quantity: number;
  }>;
}
