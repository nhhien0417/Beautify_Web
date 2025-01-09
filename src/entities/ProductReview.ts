import User from "./User";

export default interface ProductReview {
  id: number;
  user: User;
  rating: number;
  date: string;
  summary: string;
  detail: string;
  response?: string;
}
