import { Box, Grid, Typography } from "@mui/material";
import ReviewSummary from "./ReviewSummary";
import ReviewList from "./ReviewList";
import { PropProduct } from "../ProductDetail";

const Reviews = ({ product }: PropProduct) => {
  return (
    <Box width="90%" margin="0 auto">
      <Typography variant="h3" fontWeight={600} mb={3}>
        Reviews
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <ReviewSummary product={product} reviews={product.reviews} />
        </Grid>
        <Grid item xs={12} md={8}>
          <ReviewList productId={product.id} reviews={product.reviews} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reviews;
