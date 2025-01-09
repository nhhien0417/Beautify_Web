import User from "./User";

export default interface ShopReview {
  id: number;
  user: User;
  productQuality: number;
  serviceQuality: number;
  deliveryQuality: number;
  date: string;
  title: string;
  comment: string;
  response?: string;
}

export const calculateAverageRating = (review: ShopReview): number => {
  const rating = (
    (review.productQuality + review.serviceQuality + review.deliveryQuality) /
    3
  ).toFixed(1);
  return +rating;
};
