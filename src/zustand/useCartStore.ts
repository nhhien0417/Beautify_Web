import { create } from "zustand";
import Product from "../entities/Product";
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

  removeFromCart: async (id: number) => {
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
  },

  removeSelectedItems: async () => {
    set((state) => {
      const updatedCartItems = state.cartItems.filter(
        (item) => !state.selectedItemIds.includes(item.product.id)
      );

      return {
        cartItems: updatedCartItems,
        selectedItemIds: [],
      };
    });
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
