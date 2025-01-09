import { create } from "zustand";
import { getAllCategories } from "../config/api";

interface CategoryState {
  categories: string[];
  selectedCategory: string;
  fetchCategories: () => Promise<void>;
  setSelectedCategory: (category: string) => void;
}

const useCategoryStore = create<CategoryState>((set) => ({
  categories: ["All"],
  selectedCategory: "All",

  fetchCategories: async () => {
    try {
      const response = await getAllCategories(1, 10);
      const apiCategories = response.data.result.map(
        (category: { name: string }) => category.name
      );
      set({ categories: ["All", ...apiCategories] });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },

  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));

export default useCategoryStore;
