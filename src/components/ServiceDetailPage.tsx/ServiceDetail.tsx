import { useState } from "react";
import { Box, Button, Card, CardMedia, Typography, Modal } from "@mui/material";
import Service from "../../entities/Service";
import BookingForm from "./ServiceForm"; // Import BookingForm
import { useUserStore } from "../../zustand/useUserStore";
import { useNavigate } from "react-router-dom";

interface Props {
  service: Service;
}

export const ServiceDetail = ({ service }: Props) => {
  const { isAuthenticated } = useUserStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // Quản lý hiển thị form

  const handleOpen = () => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    setOpen(true);
  }; // Mở form
  const handleClose = () => setOpen(false); // Đóng form

  const { account: userInfo } = useUserStore((state) => state);

  return (
    <Box sx={{ padding: 4 }}>
      <Card
        sx={{
          height: 400,
          display: "flex",
          width: 1200,
          margin: "0 auto",
          borderRadius: 7,
          backgroundColor: "#FFFDEC",
        }}
      >
        {/* Hình ảnh bên trái */}
        <CardMedia
          component="img"
          sx={{ width: 300 }}
          image={service.image}
          alt={service.name}
        />

        {/* Nội dung chi tiết bên phải */}
        <Box sx={{ flex: 1, padding: 3 }}>
          {/* Tiêu đề */}
          <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
            {service.name}
          </Typography>

          {/* Mô tả dịch vụ */}
          <Typography
            variant="body1"
            sx={{ marginBottom: 3, color: "text.secondary" }}
          >
            {service.description}
          </Typography>

          {/* Giá */}
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 3 }}>
            Price: ${service.price}
          </Typography>

          {/* Nút đặt lịch */}
          <Button
            variant="contained"
            color="warning"
            size="large"
            onClick={handleOpen}
          >
            Book Now
          </Button>
        </Box>
      </Card>

      {/* Form đặt lịch */}
      <Modal open={open} onClose={handleClose}>
        <BookingForm
          serviceName={service.name}
          servicePrice={service.price}
          userInfo={userInfo}
          onClose={handleClose}
        />
      </Modal>
    </Box>
  );
};
