import User, { sampleUsers } from "./User";

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

export const sampleShopReviews: ShopReview[] = [
  {
    id: 3,
    user: sampleUsers[0],
    productQuality: 2.5,
    serviceQuality: 3,
    deliveryQuality: 4,
    date: "2024-12-20T00:00:00.000Z",
    title: "Quality didn’t meet expectations",
    comment:
      "The product arrived on time, but the quality didn’t match my expectations.",
    response:
      "We apologize for the inconvenience and are working on improvements.",
  },
  {
    id: 4,
    user: sampleUsers[1],
    productQuality: 3,
    serviceQuality: 4,
    deliveryQuality: 2,
    date: "2024-12-18T00:00:00.000Z",
    title: "Perfect product",
    comment:
      "This is exactly what I was looking for. Love the quality and design!",
    response: undefined,
  },
  {
    id: 5,
    user: sampleUsers[2],
    productQuality: 3,
    serviceQuality: 4,
    deliveryQuality: 3.5,
    date: "2024-12-15T00:00:00.000Z",
    title: "Good product, slow delivery",
    comment:
      "The delivery took longer than expected, but the product itself is great.",
    response: "Thank you for your patience, we appreciate your understanding!",
  },
  {
    id: 6,
    user: sampleUsers[3],
    productQuality: 3,
    serviceQuality: 4.5,
    deliveryQuality: 1,
    date: "2024-12-10T00:00:00.000Z",
    title: "Fantastic product, bad packaging",
    comment:
      "I had some issues with the packaging, but the product is fantastic!",
    response: "We will improve our packaging. Thanks for your feedback!",
  },
  {
    id: 7,
    user: sampleUsers[4],
    productQuality: 3,
    serviceQuality: 3,
    deliveryQuality: 3,
    date: "2024-12-05T00:00:00.000Z",
    title: "Decent, but overpriced",
    comment: "The product is decent, but not worth the price.",
    response: undefined,
  },
  {
    id: 8,
    user: sampleUsers[0],
    productQuality: 4.5,
    serviceQuality: 4,
    deliveryQuality: 2,
    date: "2024-11-28T00:00:00.000Z",
    title: "Great product, poor delivery",
    comment: "Product was great, but the delivery service was disappointing.",
    response:
      "We apologize for the delivery issues, we are working to improve.",
  },
  {
    id: 9,
    user: sampleUsers[1],
    productQuality: 5,
    serviceQuality: 5,
    deliveryQuality: 5,
    date: "2024-11-22T00:00:00.000Z",
    title: "Excellent experience",
    comment:
      "I am very satisfied with the product and fast delivery. Highly recommend!",
    response: "Thank you for your positive review!",
  },
  {
    id: 10,
    user: sampleUsers[2],
    productQuality: 2,
    serviceQuality: 2.5,
    deliveryQuality: 2.5,
    date: "2024-11-18T00:00:00.000Z",
    title: "Did not work as expected",
    comment: "The product didn’t work as advertised. Very disappointed.",
    response:
      "We apologize for the misunderstanding and will review the product details.",
  },
  {
    id: 11,
    user: sampleUsers[3],
    productQuality: 5,
    serviceQuality: 5,
    deliveryQuality: 0,
    date: "2024-11-15T00:00:00.000Z",
    title: "Great experience",
    comment: "Fast delivery and beautiful packaging. The product works well.",
    response: undefined,
  },
  {
    id: 12,
    user: sampleUsers[4],
    productQuality: 3.5,
    serviceQuality: 4,
    deliveryQuality: 4,
    date: "2024-11-12T00:00:00.000Z",
    title: "Good service, average product",
    comment: "The product is okay, but the customer service was excellent.",
    response:
      "We appreciate your feedback, and we will work on improving the product.",
  },
  {
    id: 13,
    user: sampleUsers[0],
    productQuality: 5,
    serviceQuality: 5,
    deliveryQuality: 5,
    date: "2024-11-10T00:00:00.000Z",
    title: "Perfect product and service",
    comment: "Super fast delivery and the product is exactly as described!",
    response: undefined,
  },
  {
    id: 14,
    user: sampleUsers[1],
    productQuality: 2,
    serviceQuality: 2.5,
    deliveryQuality: 2.5,
    date: "2024-11-08T00:00:00.000Z",
    title: "Disappointing quality",
    comment:
      "I am not happy with the product quality. It didn’t meet my expectations.",
    response:
      "We are sorry to hear that. Please reach out for a replacement or refund.",
  },
  {
    id: 15,
    user: sampleUsers[2],
    productQuality: 4,
    serviceQuality: 3.5,
    deliveryQuality: 3.5,
    date: "2024-11-06T00:00:00.000Z",
    title: "Good value, but slow shipping",
    comment: "Great value for the price, though it took a while to arrive.",
    response: undefined,
  },
  {
    id: 17,
    user: sampleUsers[3],
    productQuality: 2.5,
    serviceQuality: 3,
    deliveryQuality: 1,
    date: "2024-11-01T00:00:00.000Z",
    title: "Good support, but product lacked quality",
    comment:
      "The product didn’t meet my expectations, but the customer support was helpful.",
    response:
      "We’re sorry for the disappointment, and we’re here to help with any issues.",
  },
  {
    id: 18,
    user: sampleUsers[4],
    productQuality: 2.5,
    serviceQuality: 3,
    deliveryQuality: 1,
    date: "2024-10-30T00:00:00.000Z",
    title: "Great packaging, bad product",
    comment:
      "The packaging was great, but the product didn’t work as promised.",
    response:
      "We apologize for the inconvenience and will review the product description.",
  },
  {
    id: 19,
    user: sampleUsers[0],
    productQuality: 5,
    serviceQuality: 5,
    deliveryQuality: 4,
    date: "2024-10-25T00:00:00.000Z",
    title: "Fantastic product and service",
    comment:
      "I love the product! Delivery was fast, and everything was in perfect condition.",
    response: undefined,
  },
  {
    id: 20,
    user: sampleUsers[1],
    productQuality: 3,
    serviceQuality: 5,
    deliveryQuality: 1,
    date: "2025-01-01T09:51:09.955Z",
    title: "Good service!",
    comment: "The product is okay, but the customer service was excellent.",
    response: undefined,
  },
];
