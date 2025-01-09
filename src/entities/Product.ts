import ProductReview from "./ProductReview";

export default interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  quantity: number;
  sold: number;
  brand: string;
  description: string;
  images: string[];
  reviews: ProductReview[];
}

export const calculateAverageRating = (product: Product): number => {
  if (product.reviews.length === 0) return 0;

  const totalRatings = product.reviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  return +(totalRatings / product.reviews.length).toFixed(1);
};

export const brands = [
  "L'Oréal",
  "Maybelline",
  "Estée Lauder",
  "Clinique",
  "Dior",
  "Chanel",
  "Lancome",
  "Nivea",
  "Neutrogena",
  "MAC",
  "Dove",
];
