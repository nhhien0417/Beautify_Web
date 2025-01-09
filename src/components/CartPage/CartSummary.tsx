import useCartStore from "../../zustand/useCartStore";
import { Box, Typography, Button } from "@mui/material";

interface Props {
  onCheckout: () => void;
}

const CartSummary = ({ onCheckout }: Props) => {
  const getSelectedItemsTotal = useCartStore(
    (state) => state.getSelectedItemsTotal
  );
  const grandTotal = getSelectedItemsTotal();

  return (
    <Box
      sx={{
        backgroundColor: "#1A1A19",
        borderRadius: 2,
      }}
    >
      {/* Grand Total */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight="bold" color="#FFF">
          Grand total
        </Typography>
        <Typography variant="h6" fontWeight="bold" color="#FFF">
          ${grandTotal.toFixed(2)}
        </Typography>
      </Box>

      {/* Checkout Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          textTransform: "none",
          fontWeight: "bold",
          backgroundColor: "#FF7777",
          color: "#FFF",
          "&:hover": {
            backgroundColor: "#8D0B41",
          },
        }}
        onClick={onCheckout}
      >
        Checkout now
      </Button>
    </Box>
  );
};

export default CartSummary;
