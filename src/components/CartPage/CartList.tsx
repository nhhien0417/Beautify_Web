import {
  Box,
  Typography,
  Checkbox,
  Divider,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import CartItemCard from "./CartItemCard";
import useCartStore from "../../zustand/useCartStore";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
    fontWeightRegular: 500,
    fontSize: 15,
  },
});

const CartList = () => {
  const { cartItems, selectedItemIds, toggleSelectedItem, toggleSelectAll } =
    useCartStore();
  const isAllChecked = selectedItemIds.length === cartItems.length;

  return (
    <ThemeProvider theme={theme}>
      <Box>
        {/* Header Row for Cart Columns */}
        <Box
          display="flex"
          justifyContent="space-between"
          px={1}
          alignItems="center"
        >
          {/* Check All Checkbox */}
          <Box flex="1 1 60%" display="flex" alignItems="center">
            <Checkbox
              checked={isAllChecked}
              onChange={toggleSelectAll}
              color="primary"
            />
            <Typography fontSize={18} fontWeight={600} ml={1}>
              PRODUCT
            </Typography>
          </Box>

          {/* Quantity Column Title */}
          <Box flex="1 1 25%" display="flex" justifyContent="center">
            <Typography fontSize={18} fontWeight={600}>
              QUANTITY
            </Typography>
          </Box>

          {/* Price Column Title */}
          <Box flex="1 1 15%" textAlign="right">
            <Typography fontSize={18} fontWeight={600}>
              PRICE
            </Typography>
          </Box>
        </Box>

        {/* Cart Items */}
        {cartItems.map((item) => (
          <Box key={item.product.id}>
            <Divider sx={{ my: 1 }} />
            <CartItemCard
              item={item}
              isSelected={selectedItemIds.includes(item.product.id)}
              onToggle={() => toggleSelectedItem(item.product.id)}
            />
          </Box>
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default CartList;
