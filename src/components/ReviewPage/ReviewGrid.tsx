import { useState, useMemo } from "react";
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ReviewCard from "./ReviewCard";
import ShopReview, { calculateAverageRating } from "../../entities/ShopReview";
import AddReviewForm from "./AddReviewForm";
import { useUserStore } from "../../zustand/useUserStore";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

interface ReviewGridProps {
  reviewList: ShopReview[];
}

const ReviewGrid = ({ reviewList }: ReviewGridProps) => {
  const { isAuthenticated } = useUserStore();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("All");
  const [ratingFilter, setRatingFilter] = useState<number | "All">("All");
  const [openDialog, setOpenDialog] = useState<boolean>(false); // Trạng thái hiển thị form

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10; // Set how many reviews per page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;

  const handleAddReviewClick = () => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    setOpenDialog(true);
  };

  const handleFilterChange = (e: SelectChangeEvent<string>) => {
    setFilter(e.target.value as string);
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

  const handleRatingChange = (e: SelectChangeEvent<number | "All">) => {
    setRatingFilter(e.target.value as number | "All");
    setCurrentPage(1); // Reset to page 1 when rating filter changes
  };

  const getFilteredReviews = useMemo(() => {
    return reviewList.filter((review) => {
      const hasResponse = Boolean(review.response);
      const reviewRating = Math.round(calculateAverageRating(review));

      if (filter === "Responsed" && !hasResponse) return false;
      if (filter === "NoResponse" && hasResponse) return false;
      if (ratingFilter !== "All" && reviewRating !== ratingFilter) return false;

      return true;
    });
  }, [reviewList, filter, ratingFilter]);

  const currentReviews = getFilteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    const totalPages = Math.ceil(getFilteredReviews.length / reviewsPerPage);
    if (value <= totalPages) {
      setCurrentPage(value);
    } else {
      setCurrentPage(totalPages); // Set to last valid page
    }
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "transparent" }}>
      {/* Tiêu đề */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" fontWeight="700">
          Reviews ({getFilteredReviews.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          sx={{
            background: "linear-gradient(45deg, #6a11cb, #2575fc)",
            color: "white",
            fontWeight: "bold",
            borderRadius: "12px",
            padding: "10px 20px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              background: "linear-gradient(45deg, #5a0ebc, #1f66e1)",
              boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.3)",
            },
          }}
          onClick={handleAddReviewClick} // Gọi hàm mở form
        >
          Add Review
        </Button>
      </Box>

      {/* Bộ lọc */}
      <Box display="flex" gap={2} mb={2}>
        {/* Lọc theo loại đánh giá */}
        <FormControl size="small" sx={{ bgcolor: "#ECEBDE" }} fullWidth>
          <InputLabel>Filter</InputLabel>
          <Select label="Filter" value={filter} onChange={handleFilterChange}>
            <MenuItem value="All">All reviews</MenuItem>
            <MenuItem value="Responsed">Responsed</MenuItem>
            <MenuItem value="NoResponse">No Response</MenuItem>
          </Select>
        </FormControl>

        {/* Lọc theo rating */}
        <FormControl size="small" sx={{ bgcolor: "#ECEBDE" }} fullWidth>
          <InputLabel>Ratings</InputLabel>
          <Select
            label="Ratings"
            value={ratingFilter}
            onChange={handleRatingChange}
          >
            <MenuItem value="All">All ratings</MenuItem>
            {[5, 4, 3, 2, 1].map((rating) => (
              <MenuItem key={rating} value={rating}>
                {rating} stars
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Danh sách đánh giá */}
      <Box>
        {currentReviews.length > 0 ? (
          currentReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <Typography textAlign="center" color="text.secondary">
            No reviews match the selected filters.
          </Typography>
        )}
      </Box>

      {/* Pagination component */}
      <Pagination
        count={Math.ceil(getFilteredReviews.length / reviewsPerPage)} // Total pages
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />

      {/* Form thêm review */}
      <AddReviewForm open={openDialog} onClose={() => setOpenDialog(false)} />
    </Box>
  );
};

export default ReviewGrid;
