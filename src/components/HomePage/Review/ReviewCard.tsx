import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  styled,
  Box,
  ThemeProvider,
  createTheme,
  Rating,
  Divider,
} from "@mui/material";
import ShopReview, {
  calculateAverageRating,
} from "../../../entities/ShopReview";
import defaultImage from "../../../assets/no-image.webp";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
    fontWeightRegular: 550,
  },
});

interface Props {
  review: ShopReview;
}

const StyledCard = styled(Card)(({ theme }) => ({
  width: "400px",
  height: "400px",
  borderTopLeftRadius: "250px",
  borderTopRightRadius: "250px",
  borderBottomLeftRadius: "30px",
  borderBottomRightRadius: "30px",
  boxShadow: `
      ${theme.shadows[10]},
      5px 5px 15px rgba(0, 0, 0, 0.7),
      0px 0px 20px rgba(49, 96, 61, 0.8)`, // Shadow cơ bản
  backgroundColor: "#1A1A19",
  margin: "20px",
}));

const baseURL = "http://localhost:8080";

const ReviewCard = ({ review }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledCard>
        <Box
          sx={{
            height: "50%",
            marginTop: "20px",
            marginX: "25px",
            borderTopLeftRadius: "300px",
            borderTopRightRadius: "300px",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#FFF3E0",
          }}
        >
          <CardMedia
            component="img"
            image={
              review.user.image ? baseURL + review.user.image : defaultImage
            }
            sx={{
              marginTop: "15px",
              width: "100px",
              aspectRatio: 1,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
            sx={{
              fontWeight: "bold", // Hoặc 700 để in đậm
              fontSize: "20px",
              color: "#333",
              marginTop: "15px",
              textAlign: "center",
            }}
          >
            {review.user.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Rating
              value={calculateAverageRating(review)}
              size="medium"
              precision={0.5}
              readOnly
            />
          </Box>
        </Box>
        <CardContent>
          <Typography
            component="p"
            sx={{
              fontSize: `${Math.max(12, 20 - review.comment.length * 0.05)}px`,
              alignSelf: "center",
              textAlign: "left",
              display: "block",
              color: "#FBFCD4",
              fontWeight: "300",
              overflow: "hidden",
            }}
          >
            {review.comment.length > 190
              ? `${review.comment.slice(0, 190)}...`
              : review.comment}
          </Typography>

          {/* Show Shop's Response if Available */}
          {review.response && (
            <Box sx={{ marginTop: "15px" }}>
              <Divider sx={{ marginBottom: "10px", borderColor: "#B1BEA4" }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  color: "#FFC107",
                  marginBottom: "8px",
                }}
              >
                Shop Response:
              </Typography>
              <Typography
                component="p"
                sx={{
                  fontSize: "16px",
                  color: "#FBFCD4",
                  fontWeight: "300",
                }}
              >
                {review.response}
              </Typography>
            </Box>
          )}
        </CardContent>
      </StyledCard>
    </ThemeProvider>
  );
};

export default ReviewCard;
