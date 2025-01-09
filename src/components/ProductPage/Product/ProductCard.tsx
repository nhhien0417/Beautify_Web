import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Button,
  createTheme,
  ThemeProvider,
  CircularProgress,
} from "@mui/material";
import Product, { calculateAverageRating } from "../../../entities/Product";
import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../../../zustand/useCartStore";
import { useUserStore } from "../../../zustand/useUserStore";
import { FaCartShopping } from "react-icons/fa6";
import CheckIcon from "@mui/icons-material/Check";

interface Props {
  product: Product;
}

const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
    fontWeightRegular: 800,
  },
});

const ProductCard = ({ product }: Props) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { isAuthenticated } = useUserStore();
  const navigate = useNavigate();
  const [buttonState, setButtonState] = useState<
    "default" | "loading" | "success"
  >("default");

  const handleAddToCartWithEffect = () => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    if (buttonState === "loading") return;
    setButtonState("loading");

    setTimeout(() => {
      addToCart(product, 1);
      setButtonState("success");
      setTimeout(() => {
        setButtonState("default");
      }, 500);
    }, 1000);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Link
          key={product.id}
          to={`/products/${product.id}`}
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "block",
          }}
        >
          <Card
            sx={{
              width: 250,
              textAlign: "center",
              backgroundColor: "transparent",
              boxShadow: "none",
              border: "none",
              position: "relative",
              opacity: product.quantity === 0 ? 0.7 : 1,
            }}
          >
            <CardMedia
              component="img"
              image={product.images[0]}
              sx={{
                width: "100%",
                objectFit: "cover",
                borderRadius: 3,
                aspectRatio: 1,
                mixBlendMode: "multiply",
              }}
            />

            {product.quantity === 0 && (
              <Box
                sx={{
                  position: "absolute",
                  top: "13%",
                  left: "20%",
                  transform: "translate(-50%, -50%)",
                  width: 70,
                  height: 70,
                  backgroundColor: "rgba(255, 0, 0)",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Out of Stock
                </Typography>
              </Box>
            )}

            <CardContent sx={{ px: 0 }}>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 600,
                  height: "53px",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                  textAlign: "center",
                }}
              >
                {product.name}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mt={0.5}
              >
                <Rating
                  value={calculateAverageRating(product)}
                  readOnly
                  precision={0.5}
                  size="small"
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 0.5, fontWeight: 500 }}
                >
                  {product.reviews.length} Review
                  {product.reviews.length > 1 ? "s" : ""}
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: "#E600A0",
                  fontSize: 20,
                  mt: 0.5,
                  fontWeight: 600,
                }}
              >
                ${product.price.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Link>

        <Button
          variant="contained"
          endIcon={<FaCartShopping />}
          disabled={product.quantity === 0}
          sx={{
            mt: -1,
            backgroundColor:
              product.quantity === 0
                ? "#A0A0A0"
                : buttonState === "success"
                  ? "#4CAF50"
                  : buttonState === "loading"
                    ? "#009AA9"
                    : "#1E3A3A",
            color: "white",
            borderRadius: "20px",
            fontWeight: "bold",
            width: "90%",
            transition:
              "transform 0.2s, box-shadow 0.2s, background-color 0.2s",
            "&:hover": {
              backgroundColor: product.quantity === 0 ? "#A0A0A0" : "#FFAAAA",
               color: product.quantity === 0 ? "white" : "#1A1A1D",
              transform: product.quantity === 0 ? "none" : "scale(1.05)",
            },
          }}
          onClick={handleAddToCartWithEffect}
        >
          {product.quantity === 0 ? (
            "Out of Stock"
          ) : buttonState === "loading" ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : buttonState === "success" ? (
            <CheckIcon />
          ) : (
            "ADD TO CART"
          )}
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default ProductCard;
