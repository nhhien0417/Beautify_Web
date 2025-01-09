import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  Rating,
  Dialog,
  DialogContent,
} from "@mui/material";
import WriteReview from "./WriteReview";
import Product from "../../../entities/Product";
import { useUserStore } from "../../../zustand/useUserStore";
import ProductReview from "../../../entities/ProductReview";
import { useNavigate } from "react-router-dom";

interface Props {
  product: Product;
  reviews: ProductReview[];
}

const ReviewSummary = ({ product, reviews }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { isAuthenticated } = useUserStore();
  const navigate = useNavigate();

  // Làm tròn tất cả giá trị rating thành số nguyên
  const roundedReviews = reviews.map((review) => ({
    ...review,
    rating: Math.round(review.rating),
  }));
  const totalReviews = roundedReviews.length;
  const averageRating =
    totalReviews > 0
      ? roundedReviews.reduce((sum, review) => sum + review.rating, 0) /
        totalReviews
      : 0;

  const ratingCounts: { [key: number]: number } = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  roundedReviews.forEach((review) => {
    ratingCounts[review.rating] += 1;
  });

  const handleDialogOpen = () => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        padding: 4,
        borderRadius: 4,
        boxShadow: 10,
      }}
    >
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5" fontWeight="600">
          {totalReviews} review{totalReviews > 1 ? "s" : ""}
        </Typography>
        <Button variant="outlined" color="primary" onClick={handleDialogOpen}>
          Write a Review
        </Button>
      </Box>

      {/* Content Section */}
      <Box display="flex" alignItems="center">
        {/* Average Rating */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mr={3}
        >
          <Typography variant="h2" fontWeight={"600"}>
            {averageRating.toFixed(1)}
          </Typography>
          <Rating
            value={averageRating}
            readOnly
            precision={0.2}
            size="medium"
            sx={{
              "& .MuiRating-iconFilled": {
                color: "black", // Sets the filled stars to black
              },
              "& .MuiRating-iconEmpty": {
                color: "black", // Sets the empty stars to black
              },
            }}
          />
        </Box>

        {/* Star Rating Breakdown */}
        <Box flex="1">
          {Object.entries(ratingCounts)
            .reverse()
            .map(([stars, count]) => (
              <Box key={stars} display="flex" alignItems="center" mb={1}>
                <Typography whiteSpace="nowrap" width="30px">
                  {stars} ★
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={totalReviews > 0 ? (count / totalReviews) * 100 : 0}
                  sx={{ flexGrow: 1, mx: 1 }}
                />
                <Typography>{`(${count})`}</Typography>
              </Box>
            ))}
        </Box>
      </Box>

      {/* Dialog for Writing Review */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "16px", // Set your desired border radius here
          },
        }}
      >
        <DialogContent>
          <WriteReview product={product} onClose={handleDialogClose} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ReviewSummary;
