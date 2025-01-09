import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Rating,
  Divider,
} from "@mui/material";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState, useEffect } from "react";

interface Category {
  label: string;
  value: number;
}

interface RatingSummaryProps {
  overallRating: number;
  totalRatings: number;
  categories: Category[];
}

const RatingSummary = ({
  overallRating,
  totalRatings,
  categories,
}: RatingSummaryProps) => {
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsScrollingUp(false);
      } else if (window.scrollY < lastScrollY) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Function to get color based on rating value
  const getProgressColor = (value: number) => {
    if (value >= 4) return "#00C853";
    if (value >= 3.5) return "#76FF03";
    if (value >= 3) return "#FFEB3B";
    if (value >= 2) return "#FF9800";
    return "#D50000";
  };

  if (totalRatings === 0) {
    return (
      <Card
        sx={{
          width: "100%",
          maxWidth: "450px",
          position: "sticky",
          top: 0,
          borderRadius: 5,
          bgcolor: "#ECEBDE",
          paddingTop: isScrollingUp ? "100px" : "16px",
          transition: "padding-top 0.3s ease",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <Typography variant="h5" color="textSecondary" gutterBottom>
              No reviews yet!
            </Typography>
            <DotLottieReact
              src="https://lottie.host/2f4f488b-93de-4e58-8967-8b3405501a4c/ynv0wh2zFj.lottie"
              loop
              autoplay
            />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "450px",
        position: "sticky",
        top: 0,
        borderRadius: 5,
        bgcolor: "#ECEBDE",
        paddingTop: isScrollingUp ? "100px" : "16px",
        transition: "padding-top 0.3s ease",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontWeight="700" textAlign="left">
            Ratings
          </Typography>
        </Box>

        {/* Tổng quan đánh giá */}
        <Box
          pt={3}
          display="flex"
          alignItems="center"
          justifyContent="left"
          mb={2}
        >
          <Typography
            variant="h3"
            fontWeight="600"
            mr={2}
            color="text.primary"
          >
            {overallRating.toFixed(1)}
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="left">
            <Rating
              value={overallRating}
              precision={0.5}
              readOnly
              size="large"
            />
            <Typography ml={0.5} variant="body2" color="textSecondary">
              {totalRatings} reviews
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 3 }} />

        {/* Đánh giá theo từng tiêu chí */}
        {categories.map((category, index) => (
          <Box pt={1} key={index} mb={1.5}>
            <Box display="flex" justifyContent="space-between" mt={0.5}>
              <Typography variant="body2" fontWeight="600" gutterBottom>
                {category.label}
              </Typography>
              <Typography
                variant="body2"
                fontWeight="bold"
                color="textSecondary"
              >
                {category.value.toFixed(1)} / 5
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(category.value / 5) * 100}
              sx={{
                height: 5,
                borderRadius: 4,
                backgroundColor: "#E0E0E0",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: getProgressColor(category.value),
                },
              }}
            />
          </Box>
        ))}

        {/* Lottie animation */}
        <DotLottieReact
          src="https://lottie.host/c4ba7589-4a09-4fb0-a182-4d6abdedd218/vvpmz60ggT.lottie"
          loop
          autoplay
        />
      </CardContent>
    </Card>
  );
};

export default RatingSummary;
