import { create } from "zustand";
import Product from "../entities/Product";
import { deleteProductFromCart, updateQtyItemCart } from "../config/api";
import { useUserStore } from "./useUserStore";
import OrderItem from "../entities/OrderItem";

interface CartState {
  cartItems: OrderItem[];
  selectedItemIds: number[];
  getTotalItems: () => number;
  getUniqueItemsCount: () => number;
  setSelectedItems: (ids: number[]) => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: number, quantity: number) => void;
  removeSelectedItems: () => void;
  toggleSelectedItem: (id: number) => void;
  toggleSelectAll: () => void;
  getSelectedItemsTotal: () => number;
}

const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  selectedItemIds: [],

  getTotalItems: () =>
    get().cartItems.reduce((acc, item) => acc + item.amount, 0),

  getUniqueItemsCount: () => get().cartItems.length,

  setSelectedItems: (ids: number[]) =>
    set(() => ({
      selectedItemIds: ids,
    })),

  addToCart: async (product: Product, quantity: number = 1) => {
    const { account } = useUserStore.getState();

    try {
      set((state) => {
        const existingItem = state.cartItems.find(
          (item) => item.product.id === product.id
        );

        const currentCartQuantity = existingItem ? existingItem.amount : 0;

        const quantityActual =
          product.quantity < quantity + currentCartQuantity
            ? product.quantity - currentCartQuantity
            : quantity;

        if (quantityActual > 0) {
          updateQtyItemCart(account.email, product.id, quantityActual);
        }

        if (existingItem) {
          return {
            cartItems: state.cartItems.map((item) =>
              item.product.id === product.id
                ? { ...item, amount: item.amount + quantityActual }
                : item
            ),
          };
        }

        return {
          cartItems: [
            ...state.cartItems,
            { product, amount: quantityActual, isSelected: false },
          ],
        };
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  },

  removeFromCart: async (id: number, quantity: number = 1) => {
    const { account } = useUserStore.getState();

    try {
      await updateQtyItemCart(account.email, id, -quantity);

      set((state) => {
        let updatedCartItems = state.cartItems.filter(
          (item) => item.product.id !== id
        );

        updatedCartItems = state.cartItems.map((item) =>
          item.product.id === id && item.amount > 1
            ? { ...item, amount: item.amount - 1 }
            : item
        );

        const updatedSelectedItemIds = state.selectedItemIds.filter(
          (itemId) => itemId !== id
        );

        const itemExistsInCart = updatedCartItems.some(
          (item) => item.product.id === id
        );

        return {
          cartItems: updatedCartItems,
          selectedItemIds: itemExistsInCart
            ? state.selectedItemIds
            : updatedSelectedItemIds,
        };
      });
    } catch (error) {
      console.error("Error deleting product to cart:", error);
    }
  },

  removeSelectedItems: async () => {
    const { account } = useUserStore.getState();
    const selectedItemIds = get().selectedItemIds;
    try {
      await deleteProductFromCart(account.email, selectedItemIds);

      set((state) => {
        const updatedCartItems = state.cartItems.filter(
          (item) => !state.selectedItemIds.includes(item.product.id)
        );

        return {
          cartItems: updatedCartItems,
          selectedItemIds: [],
        };
      });
    } catch (error) {
      console.error("Error deleting selected products from cart:", error);
    }
  },

  toggleSelectedItem: (id: number) =>
    set((state) => ({
      selectedItemIds: state.selectedItemIds.includes(id)
        ? state.selectedItemIds.filter((itemId) => itemId !== id)
        : [...state.selectedItemIds, id],
    })),

  toggleSelectAll: () =>
    set((state) => {
      const allIds = state.cartItems.map((item) => item.product.id);
      return {
        selectedItemIds:
          state.selectedItemIds.length === state.cartItems.length ? [] : allIds,
      };
    }),

  getSelectedItemsTotal: () =>
    get()
      .cartItems.filter((item) =>
        get().selectedItemIds.includes(item.product.id)
      )
      .reduce((acc, item) => acc + item.amount * item.product.price, 0),
}));

export default useCartStore;
