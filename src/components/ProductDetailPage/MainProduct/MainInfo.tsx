import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  Rating,
  createTheme,
  ThemeProvider,
  TextField,
  Paper,
  CircularProgress,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import useCartStore from "../../../zustand/useCartStore";
import useCheckoutStore from "../../../zustand/useCheckoutStore";
import Product, { calculateAverageRating } from "../../../entities/Product";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../zustand/useUserStore";

interface Props {
  product: Product;
}

const MainInfo = ({ product }: Props) => {
  const { isAuthenticated } = useUserStore();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const { addCheckoutItem, resetCheckoutStore } = useCheckoutStore();
  const [buttonState, setButtonState] = useState<
    "default" | "loading" | "success"
  >("default");

  const [quantity, setQuantity] = useState(1);

  const handleAddToCartWithEffect = () => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    if (buttonState === "loading") return;
    setButtonState("loading");

    setTimeout(() => {
      addToCart(product, quantity);
      setButtonState("success");
      setTimeout(() => {
        setButtonState("default");
      }, 500);
    }, 1000);
  };

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleBuyNow = () => {
    const newItem = {
      product,
      amount: quantity,
      isSelected: true,
    };
    resetCheckoutStore();
    addCheckoutItem(newItem);

    useCheckoutStore.setState((state) => ({
      selectedItemIds: [...state.selectedItemIds, product.id],
    }));

    const selectedItemsTotal = useCheckoutStore.getState().calculateTotal();
    useCheckoutStore.setState({ selectedItemsTotal });

    navigate("/checkout");
  };

  const theme = createTheme({
    typography: {
      fontFamily: "Poppins",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {/* Product Details */}
      <Box display="flex" alignContent="center" gap={2}>
        <Paper
          sx={{
            borderRadius: "20px",
            bgcolor: "#76A188",
            display: "inline-block",
          }}
        >
          <Typography
            p={0.75}
            px={1.5}
            variant="subtitle1"
            color="white"
            fontWeight={600}
          >
            {product.category}
          </Typography>
        </Paper>

        <Paper
          sx={{
            borderRadius: "20px",
            bgcolor: "#76A188",
            display: "inline-block",
          }}
        >
          <Typography
            p={0.75}
            px={1.5}
            variant="subtitle1"
            color="white"
            fontWeight={600}
          >
            {product.brand}
          </Typography>
        </Paper>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography sx={{ fontWeight: "600", fontSize: "40px", mt: 1 }}>
          {product.name}
        </Typography>
        <Box
          display="inline-flex"
          alignItems="center"
          sx={{ whiteSpace: "nowrap" }}
        >
          <Box
            sx={{
              width: 15,
              height: 15,
              borderRadius: "50%",
              bgcolor: 5 > 0 ? "#2196F3" : "#D32F2F",
              mr: 1,
            }}
          />
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ whiteSpace: "nowrap" }}
          >
            {product.quantity > 0
              ? product.quantity + " available"
              : "Out of stock"}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" gap={1} alignItems="center">
        <Rating
          value={calculateAverageRating(product)}
          readOnly
          precision={0.5}
          size="medium"
        />
        <Typography fontWeight="600" fontSize="18px">
          ({calculateAverageRating(product)})
        </Typography>
        <Typography fontWeight="500" fontSize="16px" color="#3E7844">
          {product.reviews.length} Reviews
        </Typography>
        <Typography fontWeight="500" fontSize="16px" color="#C45C00">
          {product.sold} Sold
        </Typography>
      </Box>
      <Typography variant="h4" color="textPrimary" fontWeight="600" my={3}>
        ${product.price.toFixed(2)}
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* Quantity Section */}
      <Box>
        <Typography variant="h6" fontWeight="600">
          QUANTITY
        </Typography>
        <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
          <Button
            variant="outlined"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <TextField
            value={quantity}
            size="small"
            sx={{ width: 50, mx: 1 }}
            inputProps={{ style: { textAlign: "center" } }}
            InputProps={{
              readOnly: true, // Chỉ đọc
            }}
          />

          <Button
            variant="outlined"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= product.quantity}
          >
            +
          </Button>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Stack direction="row" spacing={2} mt={3}>
        <Button
          variant="contained"
          disabled={product.quantity === 0}
          sx={{
            fontSize: "17px",
            fontWeight: "700",
            flex: 1,
            bgcolor:
              buttonState === "success"
                ? "#2E7D32"
                : buttonState === "loading"
                  ? "#0288D1"
                  : "#1B5E20",
            color: "white",
            borderRadius: "12px",
            boxShadow:
              buttonState === "success"
                ? "0 4px 10px rgba(46, 125, 50, 0.5)"
                : buttonState === "loading"
                  ? "0 4px 10px rgba(2, 136, 209, 0.5)"
                  : "0 4px 10px rgba(27, 94, 32, 0.5)",
            "&:hover": {
              backgroundColor:
                buttonState === "success"
                  ? "#388E3C"
                  : buttonState === "loading"
                    ? "#0277BD"
                    : "#2E7D32",
            },
          }}
          onClick={handleAddToCartWithEffect}
        >
          {buttonState === "loading" ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : buttonState === "success" ? (
            <CheckIcon />
          ) : product.quantity > 0 ? (
            "ADD TO CART"
          ) : (
            "OUT OF STOCK"
          )}
        </Button>

        <Button
          variant="outlined"
          sx={{
            fontSize: "17px",
            fontWeight: "700",
            flex: 1,
            borderColor: "#0288D1",
            color: "#0288D1",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(2, 136, 209, 0.5)",
            "&:hover": {
              backgroundColor: "#E3F2FD",
              borderColor: "#0277BD",
              color: "#0277BD",
            },
          }}
          onClick={handleBuyNow}
        >
          BUY NOW
        </Button>
      </Stack>
    </ThemeProvider>
  );
};

export default MainInfo;
