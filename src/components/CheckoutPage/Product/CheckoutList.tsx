import { Box, Typography, Divider } from "@mui/material";
import CheckoutItemCard from "./CheckoutItemCard";
import useCheckoutStore from "../../../zustand/useCheckoutStore";

const CheckoutList = () => {
  const {
    checkoutItems,
    selectedItemIds,
    toggleSelectedItem,
    increaseItemAmount,
    decreaseItemAmount,
  } = useCheckoutStore();

  return (
    <Box my={2}>
      <Typography
        variant="h6"
        sx={{ color: "brown", fontWeight: "bold", mb: 2 }}
      >
        Products
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {checkoutItems.map((item) => (
        <CheckoutItemCard
          key={item.product.id}
          item={item}
          isSelected={selectedItemIds.includes(item.product.id)}
          onToggle={() => {
            toggleSelectedItem(item.product.id);
          }}
          onIncrease={() => increaseItemAmount(item.product.id)}
          onDecrease={() => decreaseItemAmount(item.product.id)}
        />
      ))}
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default CheckoutList;
