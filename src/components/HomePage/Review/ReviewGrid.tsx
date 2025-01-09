import { Box, IconButton, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import ReviewCard from "./ReviewCard";
import useShopReviewStore from "../../../zustand/useShopReviewStore";
import { calculateAverageRating } from "../../../entities/ShopReview";
import { Link } from "react-router-dom";
import { ArrowForwardOutlined } from "@mui/icons-material";

const ReviewGrid = () => {
  const { reviews } = useShopReviewStore();

  const topReviews = [...reviews]
    .sort((a, b) => calculateAverageRating(b) - calculateAverageRating(a))
    .slice(0, 3);

  return (
    <Box p="40px 30px">
      <Box display="flex" gap={2} alignItems="center">
        <Typography
          noWrap={true}
          variant="h3"
          component="h1"
          style={{ fontWeight: "bold", color: "#333", height: "70px" }}
        >
          Reviews by Customers
        </Typography>
        <Link to={"reviews"}>
          <IconButton
            sx={{
              backgroundColor: "#31603d",
              color: "white",
              fontSize: "36px",
              padding: "12px",
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "#B1aa88",
              },
            }}
          >
            <ArrowForwardOutlined sx={{ fontSize: "25px" }} />{" "}
          </IconButton>
        </Link>
      </Box>
      <Typography color="#333">
        Here're a few feedbacks which our beloved customers typed for us to
        shower some love.
      </Typography>
      <Box>
        <Grid2
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "50px",
            gap: "50px",
            flexWrap: "wrap",
          }}
        >
          {topReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Grid2>
      </Box>
    </Box>
  );
};

export default ReviewGrid;
