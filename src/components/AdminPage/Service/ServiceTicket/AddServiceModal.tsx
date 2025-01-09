import {
  Modal,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllServices } from "../../../../config/api";

const AddServiceModal = ({ open, handleClose, handleSave }: any) => {
  const [selectedServiceId, setSelectedServiceId] = useState(""); // ID của dịch vụ được chọn
  interface Service {
    id: string;
    name: string;
    price: number;
  }

  const [services, setServices] = useState<Service[]>([]); // Danh sách dịch vụ từ API
  const [price, setPrice] = useState(""); // Giá của dịch vụ được chọn

  // Fetch services when modal opens
  useEffect(() => {
    if (open) {
      fetchServices();
    }
  }, [open]);

  const fetchServices = async () => {
    try {
      const response = await getAllServices(1, 100);
      const servicesData = response.data?.result || [];
      setServices(servicesData);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Xử lý khi thay đổi dịch vụ được chọn
  const handleServiceChange = (serviceId: any) => {
    setSelectedServiceId(serviceId);

    // Tìm dịch vụ được chọn trong danh sách
    const selectedService = services.find(
      (service) => service.id === serviceId
    );
    if (selectedService) {
      setPrice(selectedService.price.toString()); // Cập nhật giá
    }
  };

  const handleSubmit = () => {
    if (!selectedServiceId || !price) {
      alert("Please select a service and fill out the fields correctly!");
      return;
    }

    const selectedService = services.find(
      (service) => service.id === selectedServiceId
    );

    handleSave({
      productName: selectedService?.name || "",
      price: Number(price),
    });
    handleClose();
    setSelectedServiceId("");
    setPrice("");
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          Add Service
        </Typography>
        {/* Service Name Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="service-name-label">Service Name</InputLabel>
          <Select
            labelId="service-name-label"
            value={selectedServiceId}
            onChange={(e) => handleServiceChange(e.target.value)}
          >
            {services.map((service) => (
              <MenuItem key={service.id} value={service.id}>
                {service.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Price (Read-only) */}
        <TextField
          fullWidth
          label="Price"
          value={price}
          InputProps={{ readOnly: true }} // Chỉ cho phép đọc
          variant="outlined"
          margin="normal"
        />

        {/* Buttons */}
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button onClick={handleClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddServiceModal;
