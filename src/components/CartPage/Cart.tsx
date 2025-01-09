import { Box, Typography, Divider, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CartList from "./CartList";
import CartSummary from "./CartSummary";
import useCartStore from "../../zustand/useCartStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useCheckoutStore from "../../zustand/useCheckoutStore";
import { Delete } from "@mui/icons-material";

interface Props {
  onClose: () => void;
}

const Cart = ({ onClose }: Props) => {
  const { getTotalItems, removeSelectedItems, selectedItemIds, cartItems } =
    useCartStore();
  const { addCheckoutItem, resetCheckoutStore } = useCheckoutStore();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCheckout = () => {
    if (selectedItemIds.length === 0) {
      setOpenSnackbar(true);
      return;
    }

    resetCheckoutStore();
    selectedItemIds.forEach((id) => {
      const item = cartItems.find((item) => item.product.id === id);
      if (item) {
        addCheckoutItem(item);
      }
    });

    useCheckoutStore.setState((state) => ({
      selectedItemIds: [...state.selectedItemIds, ...selectedItemIds],
    }));

    const selectedItemsTotal = useCheckoutStore.getState().calculateTotal();

    useCheckoutStore.setState({ selectedItemsTotal });

    navigate("/checkout");
    onClose();
  };

  const isCartEmpty = getTotalItems() === 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "600px",
        maxWidth: "90vw",
        p: 2,
        backgroundColor: "#FFFFFF",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
        transition: "all 0.3s ease",
        "@media (max-width: 600px)": {
          width: "100%",
          height: "100vh",
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 10,
          left: 15,
          backgroundColor: "#f0f0f0",
          "&:hover": {
            backgroundColor: "#e0e0e0",
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Delete Button */}
      <IconButton
        onClick={removeSelectedItems}
        sx={{
          position: "absolute",
          top: 10,
          right: 15,
          backgroundColor: "#f0f0f0",
          "&:hover": {
            backgroundColor: "#e0e0e0",
          },
        }}
        disabled={selectedItemIds.length === 0} // Disable button if no items are selected
      >
        <Delete style={{ color: "#B8001F" }} />
      </IconButton>

      {/* Cart Header */}
      <Typography
        variant="h4"
        fontWeight="600"
        textAlign="center"
        sx={{
          fontSize: "1.5rem",
          "@media (max-width: 600px)": {
            fontSize: "1.2rem",
          },
        }}
      >
        Your Shopping Cart
      </Typography>
      <Divider sx={{ my: 1.5 }} />

      {/* Cart Content */}
      {isCartEmpty ? (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontSize: "1rem",
              "@media (max-width: 600px)": {
                fontSize: "0.9rem",
              },
            }}
          >
            Your cart is empty. Add some products to see them here!
          </Typography>
        </Box>
      ) : (
        <>
          {/* Cart List */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              mb: 2,
            }}
          >
            <CartList />
          </Box>

          {/* Cart Summary */}
          <Box
            sx={{
              backgroundColor: "#1A1A19",
              px: 2,
              py: 2,
              "@media (max-width: 600px)": {
                height: "20vh",
              },
              boxShadow: "0px 8px 6px rgb(1, 1, 1, 0.5)",
            }}
          >
            <CartSummary onCheckout={handleCheckout} />
          </Box>
        </>
      )}

      {/* Snackbar for Checkout Warning */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "#D32F2F",
            color: "#FFFFFF",
            fontWeight: "bold",
          },
        }}
        message="Please select at least one item to proceed to checkout."
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setOpenSnackbar(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
};

export default Cart;
