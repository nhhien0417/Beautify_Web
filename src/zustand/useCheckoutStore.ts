import { create } from "zustand";
import OrderItem from "../entities/OrderItem";

interface CheckoutState {
  checkoutItems: OrderItem[];
  selectedItemIds: number[];
  selectedItemsTotal: number;

  addCheckoutItem: (item: OrderItem) => void;
  toggleSelectedItem: (id: number) => void;
  increaseItemAmount: (id: number) => void;
  decreaseItemAmount: (id: number) => void;
  calculateTotal: () => number;
  getSelectedItemsTotal: () => number;
  resetCheckoutStore: () => void;
}

const useCheckoutStore = create<CheckoutState>((set, get) => ({
  checkoutItems: [],
  selectedItemIds: [],
  selectedItemsTotal: 0,

  addCheckoutItem: (item: OrderItem) =>
    set((state) => {
      const newCheckoutItems = [...state.checkoutItems, item];
      const newTotal = calculateTotal(newCheckoutItems, state.selectedItemIds);
      return { checkoutItems: newCheckoutItems, selectedItemsTotal: newTotal };
    }),

  toggleSelectedItem: (id: number) =>
    set((state) => {
      const updatedSelectedItemIds = state.selectedItemIds.includes(id)
        ? state.selectedItemIds.filter((itemId) => itemId !== id)
        : [...state.selectedItemIds, id];

      const newTotal = calculateTotal(
        state.checkoutItems,
        updatedSelectedItemIds
      );
      return {
        selectedItemIds: updatedSelectedItemIds,
        selectedItemsTotal: newTotal,
      };
    }),

  increaseItemAmount: (id: number) =>
    set((state) => {
      const updatedItems = state.checkoutItems.map((item) =>
        item.product.id === id ? { ...item, amount: item.amount + 1 } : item
      );
      const newTotal = calculateTotal(updatedItems, state.selectedItemIds);
      return { checkoutItems: updatedItems, selectedItemsTotal: newTotal };
    }),

  decreaseItemAmount: (id: number) =>
    set((state) => {
      const updatedItems = state.checkoutItems.map((item) =>
        item.product.id === id && item.amount > 1
          ? { ...item, amount: item.amount - 1 }
          : item
      );
      const newTotal = calculateTotal(updatedItems, state.selectedItemIds);
      return { checkoutItems: updatedItems, selectedItemsTotal: newTotal };
    }),

  calculateTotal: () => {
    const { checkoutItems, selectedItemIds } = get();
    return calculateTotal(checkoutItems, selectedItemIds);
  },

  getSelectedItemsTotal: () => get().selectedItemsTotal,

  resetCheckoutStore: () =>
    set({
      checkoutItems: [],
      selectedItemIds: [],
      selectedItemsTotal: 0,
    }),
}));

const calculateTotal = (items: OrderItem[], selectedIds: number[]): number => {
  return items
    .filter((item) => selectedIds.includes(item.product.id))
    .reduce((total, item) => total + item.product.price * item.amount, 0);
};

export default useCheckoutStore;
