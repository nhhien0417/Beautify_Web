import { create } from "zustand";
import ShopReview, {
  calculateAverageRating,
  sampleShopReviews,
} from "../entities/ShopReview";
import {
  createCommentStore,
  deleteStoreReview,
  responseComment,
  updateStoreReview,
} from "../config/api";

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
    try {
      await createCommentStore(
        review.user.email,
        review.productQuality,
        review.serviceQuality,
        review.deliveryQuality,
        review.title,
        review.comment,
        review.date
      );

      set((state) => ({
        reviews: [review, ...state.reviews],
        filteredReviews: [review, ...state.reviews],
      }));
    } catch (error) {
      console.error("Error adding review:", error);
    }
  },

  deleteReview: async (id) => {
    try {
      await deleteStoreReview(id);
      set((state) => ({
        reviews: state.reviews.filter((review) => review.id !== id),
        filteredReviews: state.filteredReviews.filter(
          (review) => review.id !== id
        ),
      }));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  },

  updateReview: async (updatedReview) => {
    try {
      await updateStoreReview(
        updatedReview.id,
        updatedReview.productQuality,
        updatedReview.serviceQuality,
        updatedReview.deliveryQuality,
        updatedReview.title,
        updatedReview.comment
      );
      set((state) => ({
        reviews: state.reviews.map((review) =>
          review.id === updatedReview.id ? updatedReview : review
        ),
        filteredReviews: state.filteredReviews.map((review) =>
          review.id === updatedReview.id ? updatedReview : review
        ),
      }));
    } catch (error) {
      console.error("Error updating review:", error);
    }
  },

  addResponse: async (id, response) => {
    try {
      const res = await responseComment(id, response);
      console.log(res);

      set((state) => ({
        reviews: state.reviews.map((review) =>
          review.id === id ? { ...review, response } : review
        ),
        filteredReviews: state.filteredReviews.map((review) =>
          review.id === id ? { ...review, response } : review
        ),
      }));
    } catch (error) {
      console.error("Error adding response:", error);
    }
  },
}));

export default useShopReviewStore;
