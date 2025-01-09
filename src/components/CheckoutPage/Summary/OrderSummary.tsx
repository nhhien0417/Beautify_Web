import {
  Box,
  Typography,
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import useCheckoutStore from "../../../zustand/useCheckoutStore";

interface OrderSummaryProps {
  shippingFee: number;
  voucherDiscount: number;
  isVoucherPercentage: boolean;
  onPlaceOrder: () => void;
  setPrice: (price: number) => void;
}

const OrderSummary = ({
  shippingFee,
  voucherDiscount,
  isVoucherPercentage,
  setPrice,
  onPlaceOrder,
}: OrderSummaryProps) => {
  const { getSelectedItemsTotal } = useCheckoutStore();
  const productsTotal = getSelectedItemsTotal();

  const discountAmount = isVoucherPercentage
    ? (productsTotal * voucherDiscount) / 100
    : voucherDiscount;

  const discountedPrice = productsTotal - discountAmount;
  const finalPrice = Math.max(0, discountedPrice + shippingFee);
  setPrice(finalPrice);

  // Confirmation dialog state
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handlePlaceOrderClick = () => {
    setOpenConfirmDialog(true); // Open confirmation dialog when user clicks on Place Order
  };

  const handleCloseDialog = () => {
    setOpenConfirmDialog(false); // Close dialog when user cancels or confirms
  };

  const handleConfirmOrder = () => {
    onPlaceOrder(); // Proceed with placing the order
    handleCloseDialog(); // Close the dialog
  };

  return (
    <Box
      my={2}
      p={2}
      sx={{
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ color: "#6c63ff", fontWeight: "bold", mb: 2 }}
      >
        Total Summary
      </Typography>
      <Box>
        <Typography variant="body1" sx={{ fontWeight: "500", color: "#555" }}>
          Products:
          <strong style={{ color: "green", marginLeft: "8px" }}>
            ${productsTotal.toFixed(2).toLocaleString()}
          </strong>
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "500", color: "#555" }}>
          Delivery Fee:
          <strong style={{ color: "green", marginLeft: "8px" }}>
            ${shippingFee.toFixed(2).toLocaleString()}
          </strong>
        </Typography>

        {voucherDiscount > 0 && (
          <Typography variant="body1" sx={{ fontWeight: "500", color: "#555" }}>
            Discount:
            <strong style={{ color: "green", marginLeft: "8px" }}>
              {isVoucherPercentage
                ? `${voucherDiscount}%`
                : `$${voucherDiscount.toLocaleString()}`}
            </strong>
          </Typography>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography
          variant="h5"
          color="primary"
          fontWeight="bold"
          sx={{ textAlign: "right", color: "green" }}
        >
          Total:
          <strong style={{ marginLeft: "8px" }}>
            ${finalPrice.toFixed(2).toLocaleString()}
          </strong>
        </Typography>
      </Box>

      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            padding: "12px",
            borderRadius: "20px",
            "&:hover": { backgroundColor: "#5a52e3" },
          }}
          onClick={handlePlaceOrderClick}
        >
          Place Order
        </Button>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirmDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Your Order</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="textSecondary">
            Are you sure you want to place this order? Once confirmed, it cannot
            be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmOrder} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderSummary;
