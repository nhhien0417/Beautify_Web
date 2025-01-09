import { create } from "zustand";
import Product, { sampleProducts } from "../entities/Product";
import {
  createCommentProduct,
  deleteProductReview,
  updateProductReview,
} from "../config/api";
import ProductReview from "../entities/ProductReview";

interface Filters {
  searchQuery: string;
  category: string;
  brand: string[];
  sortOption: string;
  priceRange: [number, number];
}

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  filters: Filters;

  // Product Handlers
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  setProducts: (products: Product[]) => void;
  setProduct: (product: Product) => void;

  // Filters
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
  setBrandFilter: (brands: string[]) => void;
  setSortOption: (option: string) => void;
  setPriceRangeFilter: (range: [number, number]) => void;
  resetFilters: () => void;

  // Review Handlers
  addReview: (productId: number, review: ProductReview) => Promise<void>;
  removeReview: (productId: number, reviewId: number) => Promise<void>;
  editReview: (
    productId: number,
    reviewId: number,
    updatedReview: Partial<ProductReview>
  ) => Promise<void>;

  getAllBrands: () => string[];
}

const applyFilters = (products: Product[], filters: Filters): Product[] => {
  const { searchQuery, category, brand, priceRange, sortOption } = filters;

  const filtered = products.filter((product) => {
    const matchesSearchQuery = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory = category ? product.category === category : true;
    const matchesBrand = brand.length ? brand.includes(product.brand) : true;
    const matchesPriceRange =
      priceRange[1] !== -1
        ? product.price >= priceRange[0] && product.price <= priceRange[1]
        : true;

    return (
      matchesSearchQuery && matchesCategory && matchesBrand && matchesPriceRange
    );
  });

  const sortedByCriteria = (() => {
    switch (sortOption) {
      case "featured":
        return filtered;
      case "bestSelling":
        return filtered.sort((a, b) => b.sold - a.sold);
      case "alphabeticalAZ":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case "alphabeticalZA":
        return filtered.sort((a, b) => b.name.localeCompare(a.name));
      case "priceLowHigh":
        return filtered.sort((a, b) => a.price - b.price);
      case "priceHighLow":
        return filtered.sort((a, b) => b.price - a.price);
      default:
        return filtered;
    }
  })();

  const sortedByQuantity = sortedByCriteria.sort((a, b) => {
    if (a.quantity === 0 && b.quantity !== 0) return 1;
    if (a.quantity !== 0 && b.quantity === 0) return -1;
    return 0;
  });

  return sortedByQuantity;
};

const useProductStore = create<ProductState>((set) => ({
  products: sampleProducts,
  filteredProducts: sampleProducts,
  filters: {
    searchQuery: "",
    category: "",
    brand: [],
    sortOption: "",
    priceRange: [0, -1],
  },

  addProduct: (product) =>
    set((state) => {
      const newProducts = [...state.products, product];
      return {
        products: newProducts,
        filteredProducts: applyFilters(newProducts, state.filters),
      };
    }),

  removeProduct: (id) =>
    set((state) => {
      const newProducts = state.products.filter((product) => product.id !== id);
      return {
        products: newProducts,
        filteredProducts: applyFilters(newProducts, state.filters),
      };
    }),

  setProducts: (products: Product[]) =>
    set((state) => {
      return {
        products,
        filteredProducts: applyFilters(products, state.filters),
      };
    }),

  setProduct: (product: Product) =>
    set((state) => {
      const productExists = state.products.some((p) => p.id === product.id);
      if (productExists) {
        return {
          ...state,
          products: state.products.map((p) =>
            p.id === product.id ? product : p
          ),
        };
      }
      return {
        ...state,
        products: [...state.products, product],
      };
    }),

  getAllBrands: (): string[] => {
    return Array.from(
      new Set(
        useProductStore.getState().products.map((product) => product.brand)
      )
    );
  },

  setSearchQuery: (query) =>
    set((state) => ({
      filters: { ...state.filters, searchQuery: query },
      filteredProducts: applyFilters(state.products, {
        ...state.filters,
        searchQuery: query,
      }),
    })),

  setCategoryFilter: (category) =>
    set((state) => ({
      filters: { ...state.filters, category },
      filteredProducts: applyFilters(state.products, {
        ...state.filters,
        category,
      }),
    })),

  setBrandFilter: (brands: string[]) =>
    set((state) => ({
      filters: { ...state.filters, brand: brands },
      filteredProducts: applyFilters(state.products, {
        ...state.filters,
        brand: brands,
      }),
    })),

  setSortOption: (option) =>
    set((state) => ({
      filters: { ...state.filters, sortOption: option },
      filteredProducts: applyFilters(state.products, {
        ...state.filters,
        sortOption: option,
      }),
    })),

  setPriceRangeFilter: (range) =>
    set((state) => ({
      filters: { ...state.filters, priceRange: range },
      filteredProducts: applyFilters(state.products, {
        ...state.filters,
        priceRange: range,
      }),
    })),

  resetFilters: () =>
    set((state) => ({
      filters: {
        searchQuery: "",
        category: "",
        brand: [],
        sortOption: "",
        priceRange: [0, -1],
      },
      filteredProducts: applyFilters(state.products, state.filters),
    })),

  addReview: async (productId, review) => {
    try {
      await createCommentProduct(
        productId,
        review.user.email,
        review.summary,
        review.detail,
        review.date,
        review.rating
      );

      set((state) => {
        const updatedProducts = state.products.map((product) => {
          if (product.id === productId) {
            return {
              ...product,
              reviews: [review, ...(product.reviews || [])],
            };
          }
          return product;
        });

        return {
          products: updatedProducts,
          filteredProducts: applyFilters(updatedProducts, state.filters),
        };
      });
    } catch (error) {
      console.error("Error adding review:", error);
    }
  },

  removeReview: async (productId, reviewId) => {
    try {
      await deleteProductReview(reviewId);

      set((state) => {
        const updatedProducts = state.products.map((product) => {
          if (product.id === productId) {
            const updatedReviews = product.reviews?.filter(
              (review) => review.id !== reviewId
            );
            return { ...product, reviews: updatedReviews };
          }
          return product;
        });

        return {
          products: updatedProducts,
          filteredProducts: applyFilters(updatedProducts, state.filters),
        };
      });
    } catch (error) {
      console.error("Error removing review:", error);
    }
  },

  editReview: async (productId, reviewId, updatedReview) => {
    try {
      await updateProductReview(
        reviewId,
        updatedReview.rating ?? 0,
        updatedReview.detail ?? "",
        updatedReview.summary ?? ""
      );

      set((state) => {
        const updatedProducts = state.products.map((product) => {
          if (product.id === productId) {
            const updatedReviews = product.reviews?.map((review) =>
              review.id === reviewId ? { ...review, ...updatedReview } : review
            );
            return { ...product, reviews: updatedReviews };
          }
          return product;
        });

        return {
          products: updatedProducts,
          filteredProducts: applyFilters(updatedProducts, state.filters),
        };
      });
    } catch (error) {
      console.error("Error editing review:", error);
    }
  },
}));

export default useProductStore;
