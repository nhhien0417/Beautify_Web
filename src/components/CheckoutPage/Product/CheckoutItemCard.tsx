import {
  Card,
  Box,
  Checkbox,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import OrderItem from "../../../entities/OrderItem";

interface Props {
  item: OrderItem;
  isSelected: boolean;
  onToggle: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

const CheckoutItemCard = ({
  item,
  isSelected,
  onToggle,
  onIncrease,
  onDecrease,
}: Props) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
        "&:hover": {
          boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
          transform: "scale(1.02)",
          transition: "0.3s ease-in-out",
        },
      }}
    >
      <Box display="flex" alignItems="center">
        <Checkbox
          checked={isSelected}
          onChange={onToggle}
          sx={{
            color: "primary.main",
            "&.Mui-checked": { color: "blue" },
            ml: 1,
          }}
        />
        {item.product.images && (
          <Box
            component="img"
            src={item.product.images[0]}
            alt={item.product.name}
            sx={{
              width: 80,
              height: 80,
              borderRadius: 1,
              objectFit: "cover",
              ml: 2,
            }}
          />
        )}
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {item.product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Category: {item.product.category}
          </Typography>
          <Typography
            variant="body1"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            ${item.product.price.toFixed(2).toLocaleString()} x {item.amount}
          </Typography>
        </CardContent>
      </Box>
      <Box display="flex" alignItems="center" pr={2}>
        {/* Các nút điều chỉnh số lượng */}
        <IconButton onClick={onDecrease} sx={{ color: "primary.main" }}>
          <Remove />
        </IconButton>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {item.amount}
        </Typography>
        <IconButton onClick={onIncrease} sx={{ color: "primary.main" }}>
          <Add />
        </IconButton>

        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color: "green",
            textAlign: "right",
            ml: 2,
          }}
        >
          ${(item.product.price * item.amount).toFixed(2).toLocaleString()}
        </Typography>
      </Box>
    </Card>
  );
};

export default CheckoutItemCard;
