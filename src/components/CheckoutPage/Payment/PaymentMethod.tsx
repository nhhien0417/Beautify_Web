import { Box, Typography, Button, Divider } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment"; // Thêm biểu tượng

interface PaymentMethodProps {
  method: string;
  onChangePaymentMethod: () => void;
}

const PaymentMethod = ({
  method,
  onChangePaymentMethod,
}: PaymentMethodProps) => (
  <Box
    my={2}
    p={2}
    sx={{
      backgroundColor: "#f9f9f9",
      borderRadius: 2,
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }}
  >
    <Box display="flex" alignItems="center" mb={1}>
      <PaymentIcon sx={{ color: "#6c63ff", mr: 1 }} />{" "}
      {/* Icon với màu tím nhạt */}
      <Typography
        variant="subtitle1"
        sx={{ color: "#333", fontWeight: "bold" }}
      >
        Payment Method
      </Typography>
    </Box>
    <Divider sx={{ mb: 2 }} /> {/* Dòng kẻ ngang phân cách */}
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="body1" sx={{ fontWeight: 500, color: "#555" }}>
        {method}
      </Typography>
      {/* <Button
        variant="outlined" // Thay đổi sang nút viền
        size="small"
        color="primary"
        sx={{ fontWeight: "bold", textTransform: "none" }} // Tắt chữ hoa
        onClick={onChangePaymentMethod}
      >
        Change
      </Button> */}
    </Box>
  </Box>
);

export default PaymentMethod;
