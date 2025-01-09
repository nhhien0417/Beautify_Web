import { create } from "zustand";

interface CategoryState {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const sampleCategories = [
  "All",
  "Sunscreen",
  "Serum",
  "Cleanser",
  "Makeup Remover",
  "Skincare",
  "Fragrance",
];

const useCategoryStore = create<CategoryState>((set) => ({
  categories: sampleCategories,
  selectedCategory: "All",

  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));

export default useCategoryStore;
