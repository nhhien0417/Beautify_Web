import Product from "./Product";

export default interface OrderItem {
  product: Product;
  amount: number;
  isSelected: boolean;
}
