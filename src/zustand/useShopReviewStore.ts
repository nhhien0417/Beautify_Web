import { create } from "zustand";
import ShopReview, {
  calculateAverageRating,
  sampleShopReviews,
} from "../entities/ShopReview";

interface ReviewStoreState {
  reviews: ShopReview[];
  filteredReviews: ShopReview[];
  addReview: (review: ShopReview) => void;
  setReviews: (reviews: ShopReview[]) => void;
  filterReviewsByRating: (rating: number) => void;
  deleteReview: (id: number) => void;
  updateReview: (updatedReview: ShopReview) => void;
  addResponse: (id: number, response: string) => void;
}

const useShopReviewStore = create<ReviewStoreState>((set) => ({
  reviews: sampleShopReviews,
  filteredReviews: sampleShopReviews,

  setReviews: (reviews) =>
    set(() => ({
      reviews,
      filteredReviews: reviews,
    })),

  filterReviewsByRating: (rating) =>
    set((state) => ({
      filteredReviews: state.reviews.filter(
        (review) => Math.floor(calculateAverageRating(review)) === rating
      ),
    })),

  addReview: async (review) => {
    set((state) => ({
      reviews: [review, ...state.reviews],
      filteredReviews: [review, ...state.reviews],
    }));
  },

  deleteReview: async (id) => {
    set((state) => ({
      reviews: state.reviews.filter((review) => review.id !== id),
      filteredReviews: state.filteredReviews.filter(
        (review) => review.id !== id
      ),
    }));
  },

  updateReview: async (updatedReview) => {
    set((state) => ({
      reviews: state.reviews.map((review) =>
        review.id === updatedReview.id ? updatedReview : review
      ),
      filteredReviews: state.filteredReviews.map((review) =>
        review.id === updatedReview.id ? updatedReview : review
      ),
    }));
  },

  addResponse: async (id, response) => {
    set((state) => ({
      reviews: state.reviews.map((review) =>
        review.id === id ? { ...review, response } : review
      ),
      filteredReviews: state.filteredReviews.map((review) =>
        review.id === id ? { ...review, response } : review
      ),
    }));
  },
}));

export default useShopReviewStore;
