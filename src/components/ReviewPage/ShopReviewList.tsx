import { Grid, Box } from "@mui/material";
import RatingSummary from "./RatingSummary";
import ReviewGrid from "./ReviewGrid";
import useShopReviewStore from "../../zustand/useShopReviewStore";
import { calculateAverageRating } from "../../entities/ShopReview";

const ShopReviewList = () => {
  const { reviews } = useShopReviewStore();
  const totalReviews = reviews.length;

  const avgProductQuality = (
    reviews.reduce((sum, review) => sum + review.productQuality, 0) /
    totalReviews
  ).toFixed(1);

  const avgServiceQuality = (
    reviews.reduce((sum, review) => sum + review.serviceQuality, 0) /
    totalReviews
  ).toFixed(1);

  const avgDeliveryQuality = (
    reviews.reduce((sum, review) => sum + review.deliveryQuality, 0) /
    totalReviews
  ).toFixed(1);

  const overallRating = (
    reviews.reduce((sum, review) => sum + calculateAverageRating(review), 0) /
    totalReviews
  ).toFixed(1);

  return (
    <Box mt={2} p={2} sx={{ width: "80%", margin: "auto" }}>
      <Grid container spacing={3}>
        {/* Rating Summary */}
        <Grid item xs={12} md={4}>
          <RatingSummary
            overallRating={parseFloat(overallRating)}
            totalRatings={totalReviews}
            categories={[
              {
                label: "Product Quality",
                value: parseFloat(avgProductQuality),
              },
              {
                label: "Service Quality",
                value: parseFloat(avgServiceQuality),
              },
              {
                label: "Delivery Quality",
                value: parseFloat(avgDeliveryQuality),
              },
            ]}
          />
        </Grid>

        {/* Review List */}
        <Grid item xs={12} md={8}>
          <ReviewGrid reviewList={reviews} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShopReviewList;
