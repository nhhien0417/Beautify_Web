import { Box, Typography, IconButton, Checkbox } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import useCartStore from "../../zustand/useCartStore";
import OrderItem from "../../entities/OrderItem";

interface Props {
  item: OrderItem;
  isSelected: boolean;
  onToggle: () => void;
}

const CartItemCard = ({ item, isSelected, onToggle }: Props) => {
  const { addToCart, removeFromCart } = useCartStore();

  const totalPrice = item.product.price * item.amount;

  const handleRemove = () => {
    if (item.amount > 1) {
      removeFromCart(item.product.id, 1);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={1}
    >
      {/* Left Section: Checkbox, Product Info */}
      <Box flex="1 1 60%" display="flex" alignItems="center">
        {/* Checkbox */}
        <Checkbox color="primary" checked={isSelected} onChange={onToggle} />

        {/* Product Image */}
        <Box
          component="img"
          src={item.product.images[0]}
          alt={item.product.name}
          sx={{
            width: 80,
            height: 80,
            borderRadius: "8px",
            objectFit: "cover", // Đảm bảo ảnh không bị bóp méo
            aspectRatio: "1", // Giữ tỷ lệ 1:1
            ml: 1,
          }}
        />

        {/* Product Info */}
        <Box ml={1}>
          <Typography variant="subtitle2" fontWeight="600" lineHeight={1.5}>
            {item.product.name}
          </Typography>
          <Typography fontSize={14} fontWeight={500} lineHeight={1.5}>
            Available: {item.product.quantity}
          </Typography>
        </Box>
      </Box>

      {/* Middle Section: Quantity Controls */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          border: "1px solid #E2E8F0",
          borderRadius: "10px",
          backgroundColor: "#FFFFFF",
          width: "100px",
          height: "45px",
        }}
      >
        <IconButton
          size="small"
          onClick={handleRemove}
          sx={{ color: "text.secondary" }}
          disabled={item.amount === 1}
        >
          <RemoveIcon />
        </IconButton>
        <Typography variant="body1" fontWeight="600">
          {item.amount}
        </Typography>
        <IconButton
          size="small"
          onClick={() => addToCart(item.product, 1)}
          sx={{ color: "text.secondary" }}
          disabled={item.amount >= item.product.quantity}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* Right Section: Price */}
      <Box flex="1 1 15%" textAlign="right">
        <Typography variant="body1" fontWeight="600">
          ${totalPrice.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default CartItemCard;
