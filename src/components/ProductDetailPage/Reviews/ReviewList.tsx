import React, { useState } from "react";
import { Box, Pagination, Typography } from "@mui/material";
import ReviewItem from "./ReviewItem";
import ProductReview from "../../../entities/ProductReview";

interface Props {
  productId: number;
  reviews: ProductReview[];
}

const REVIEWS_PER_PAGE = 6;

const ReviewList = ({ productId, reviews }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const endIndex = startIndex + REVIEWS_PER_PAGE;

  if (!reviews || reviews.length === 0) {
    return (
      <Box textAlign="center">
        <Typography variant="h6" color="textSecondary">
          No reviews available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {reviews.slice(startIndex, endIndex).map((review, index) => (
        <React.Fragment key={index}>
          <ReviewItem productId={productId} review={review} />
          {index < REVIEWS_PER_PAGE - 1 &&
            index + startIndex < reviews.length - 1}
        </React.Fragment>
      ))}

      {/* Pagination Component */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          variant="outlined"
          count={Math.ceil(reviews.length / REVIEWS_PER_PAGE)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default ReviewList;
