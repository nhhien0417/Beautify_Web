import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EventIcon from "@mui/icons-material/Event";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import User from "../../entities/User";
import { formatDate } from "../../services/date";

interface BookingFormProps {
  serviceName: string;
  servicePrice: number;
  userInfo: User;
  onClose: () => void;
}

const ServiceForm: React.FC<BookingFormProps> = ({
  serviceName,
  servicePrice,
  userInfo,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: userInfo?.name || "",
    phoneNumber: userInfo?.phoneNumber || "",
    appointmentDate: new Date().toISOString(), // Định dạng mặc định ISO 8601
  });

  const [appointmentDateError, setAppointmentDateError] = useState<
    string | null
  >(null);

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // State cho dialog xác nhận
  const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null); // State to hold phone error

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => {
      if (name === "appointmentDate") {
        const date = new Date(value);
        return { ...prevData, [name]: date.toISOString() };
      }

      // Validate phone number
      if (name === "phoneNumber") {
        const cleanedPhoneNumber = value.replace(/\D/g, ""); // Remove non-numeric characters
        if (cleanedPhoneNumber.length !== 10) {
          setPhoneNumberError(
            "Invalid phone number. Please enter exactly 10 digits."
          );
        } else {
          setPhoneNumberError(null);
        }
        return { ...prevData, [name]: cleanedPhoneNumber };
      }

      return { ...prevData, [name]: value };
    });
  };

  // Hàm validate form

  // Xử lý xác nhận đặt lịch
  const handleConfirm = async () => {
    onClose(); // Đóng form sau khi hoàn thành
  };

  // Mở dialog xác nhận
  const handleOpenConfirmDialog = () => {
    const appointmentDate = new Date(formData.appointmentDate);
    const today = new Date();

    // Chuyển cả hai ngày về chỉ có thông tin ngày (không có giờ phút)
    const appointmentDateOnly = new Date(
      appointmentDate.getFullYear(),
      appointmentDate.getMonth(),
      appointmentDate.getDate()
    );

    const todayOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    // So sánh chỉ ngày
    if (appointmentDateOnly <= todayOnly) {
      setAppointmentDateError("Appointment date must be after today.");
      return;
    }

    setAppointmentDateError(null);
    setOpenConfirmDialog(true);
  };

  // Đóng dialog xác nhận
  const handleCloseDialog = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        backgroundColor: "#FFFDEC",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" fontWeight={600} component="h2" gutterBottom>
        Book Service
      </Typography>

      <TextField
        fullWidth
        label="Your Name"
        name="name"
        variant="outlined"
        value={formData.name}
        onChange={handleInputChange}
        InputProps={{
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Phone Number"
        name="phoneNumber"
        variant="outlined"
        value={formData.phoneNumber}
        onChange={handleInputChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhoneIcon />
            </InputAdornment>
          ),
        }}
        error={Boolean(phoneNumberError)} // Highlight error in the field
        helperText={phoneNumberError} // Show error message below the field
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Appointment Date"
        name="appointmentDate"
        type="date"
        variant="outlined"
        value={formData.appointmentDate.split("T")[0]} // Hiển thị ngày mà không có giờ
        onChange={handleInputChange}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EventIcon />
            </InputAdornment>
          ),
        }}
        error={Boolean(appointmentDateError)} // Hiển thị lỗi nếu có
        helperText={appointmentDateError} // Thông báo lỗi
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Service Name"
        variant="outlined"
        value={serviceName}
        InputProps={{
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">
              <DescriptionIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Total Price"
        variant="outlined"
        value={`${servicePrice}`}
        InputProps={{
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">
              <AttachMoneyIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        color="warning"
        fullWidth
        onClick={handleOpenConfirmDialog} // Mở dialog xác nhận
      >
        Confirm Booking
      </Button>

      {/* Dialog xác nhận */}
      <Dialog open={openConfirmDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Your Booking</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="textSecondary">
            Are you sure you want to confirm your booking for the service{" "}
            <strong>{serviceName}</strong> at{" "}
            <strong>{formatDate(formData.appointmentDate)}</strong>?
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Total Price: <strong>${servicePrice}</strong>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="warning" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ServiceForm;
