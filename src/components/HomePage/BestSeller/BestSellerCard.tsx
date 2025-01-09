import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  styled,
  Box,
  IconButton,
  ThemeProvider,
  createTheme,
  CircularProgress,
} from "@mui/material";
import { FaStar } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineFavorite } from "react-icons/md";
import Product, { calculateAverageRating } from "../../../entities/Product";
import { Link } from "react-router-dom";
import useCartStore from "../../../zustand/useCartStore";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
    fontWeightRegular: 550,
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  width: "300px",
  borderTopLeftRadius: "250px",
  borderTopRightRadius: "250px",
  borderBottomLeftRadius: "30px",
  borderBottomRightRadius: "30px",
  transition: "0.3s",
  boxShadow: `
    ${theme.shadows[10]},
    5px 5px 15px rgba(0, 0, 0, 0.7),
    0px 0px 20px rgba(49, 96, 61, 0.8)`,
  backgroundColor: "#1A1A19",
}));

// Accepting product props
interface Props {
  product: Product;
}

const BestSellerCard = ({ product }: Props) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [buttonState, setButtonState] = useState<
    "default" | "loading" | "success"
  >("default");

  const handleAddToCartWithEffect = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation if needed
    if (buttonState === "loading") return; // Prevent multiple clicks

    setButtonState("loading");

    // Simulate loading process (e.g., API call)
    setTimeout(() => {
      addToCart(product, 1);
      setButtonState("success");

      setTimeout(() => {
        setButtonState("default");
      }, 500); // Reset button state after 500ms
    }, 1000); // Simulate a 1-second delay before adding to cart
  };

  return (
    <ThemeProvider theme={theme}>
      <Link
        key={product.id}
        to={`/products/${product.id}`}
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
      >
        <StyledCard>
          <CardMedia
            component="img"
            height="300"
            image={product.images[0]}
            alt="Product"
            sx={{
              padding: "20px",
              borderRadius: "50%",
              aspectRatio: 1,
            }}
          />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  fontWeight: 600,
                  fontSize: "17px",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  textOverflow: "ellipsis",
                  height: "50px",
                  color: "#FBFCD4",
                }}
              >
                {product.name}
              </Typography>

              <IconButton>
                <MdOutlineFavorite color="red" />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#F54C0F",
                  fontWeight: 600,
                }}
              >
                ${product.price}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2px",
                }}
              >
                <FaStar color="#FFBE0D" />
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#FBFCD4",
                  }}
                >
                  {calculateAverageRating(product)}
                </Typography>
                <Typography
                  sx={{
                    marginLeft: "5px",
                    fontSize: "13px",
                    color: "grey",
                    fontWeight: 500,
                  }}
                >
                  {product.reviews.length} reviews
                </Typography>
              </Box>
            </Box>
          </CardContent>
          <Box display="flex" justifyContent="center" pb={2}>
            <Button
              variant={"outlined"}
              endIcon={<FaCartShopping />}
              onClick={handleAddToCartWithEffect}
              sx={{
                color: "#FBFCD4",
                borderRadius: "35px",
                border: "2px solid",
                width: "250px",
                height: "50px",
                fontWeight: 1000,
                fontSize: "12px",
                transition: "background 0.3s, color 0.3s", // Smooth transition effect
                background: "transparent", // Initially transparent background
                "&:hover": {
                  background: "linear-gradient(45deg, #FFD700, #FFC107)", // Gold gradient on hover
                  color: "#1A1A1D", // Text color changes on hover
                  border: "2px solid #FFC107", // Adjust border color on hover
                },
              }}
            >
              {buttonState === "loading" ? (
                <CircularProgress size={20} sx={{ color: "white" }} />
              ) : buttonState === "success" ? (
                <CheckIcon />
              ) : (
                "Add to Cart"
              )}
            </Button>
          </Box>
        </StyledCard>
      </Link>
    </ThemeProvider>
  );
};

export default BestSellerCard;
