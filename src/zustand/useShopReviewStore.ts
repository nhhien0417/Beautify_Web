import { create } from "zustand";
import ShopReview, { calculateAverageRating } from "../entities/ShopReview";
import {
  createCommentStore,
  deleteStoreReview,
  getAllCommentStore,
  responseComment,
  updateStoreReview,
} from "../config/api";

interface ReviewStoreState {
  reviews: ShopReview[];
  filteredReviews: ShopReview[];
  fetchShopReviews: () => Promise<void>;
  addReview: (review: ShopReview) => void;
  setReviews: (reviews: ShopReview[]) => void;
  filterReviewsByRating: (rating: number) => void;
  deleteReview: (id: number) => void;
  updateReview: (updatedReview: ShopReview) => void;
  addResponse: (id: number, response: string) => void;
}

const useShopReviewStore = create<ReviewStoreState>((set) => ({
  reviews: [],
  filteredReviews: [],

  fetchShopReviews: async () => {
    try {
      const response = await getAllCommentStore(1, 100);
      if (response && response.data && response.data.result) {
        const mappedReviews = response.data.result.map((item: any) => ({
          id: item.id,
          user: {
            id: item.user.id,
            image: item.user.userImage,
            name: item.user.name,
          },
          productQuality: item.productQuality,
          serviceQuality: item.serviceQuality,
          deliveryQuality: item.deliveryQuality,
          date: item.date,
          title: item.title,
          comment: item.comment,
          response: item.response,
        }));
        set(() => ({
          reviews: mappedReviews,
          filteredReviews: mappedReviews,
        }));
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  },

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
