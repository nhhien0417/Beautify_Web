import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Modal,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import { updatePermission } from "../../../../config/api"; // API để cập nhật permission

const UpdatePermissionModal = ({
  open,
  handleClose,
  onUpdated,
  permissionId,
  currentData,
}: any) => {
  const [formData, setFormData] = useState({
    name: "",
    api: "",
    method: "",
    module: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" hoặc "error"
  });

  useEffect(() => {
    if (open) {
      // Set form data when the modal opens
      setFormData({
        name: currentData.name || "",
        api: currentData.apiPath || "",
        method: currentData.method || "",
        module: currentData.module || "",
      });
    }
  }, [open, currentData]); // Update when `open` or `currentData` changes

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    const { name, api, method, module } = formData;

    if (!name || !api || !method || !module) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        severity: "error",
      });
      return;
    }

    try {
      const res = await updatePermission(
        permissionId,
        name,
        api,
        method,
        module
      );

      const statusCode = (res as unknown as { statusCode: number }).statusCode;
      if (statusCode === 400) {
        setSnackbar({
          open: true,
          message: "Permission already exists.",
          severity: "error",
        });
      } else if (statusCode === 200) {
        setSnackbar({
          open: true,
          message: "Permission updated successfully!",
          severity: "success",
        });
        handleClose();

        if (onUpdated) {
          onUpdated();
        }
      }
    } catch (error) {
      console.error("Error updating permission", error);
    }
  };

  return (
    <Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Update Permission
          </Typography>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="API"
            name="api"
            value={formData.api}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Method"
            name="method"
            value={formData.method}
            onChange={handleInputChange}
            fullWidth
            select
            sx={{ mb: 2 }}
          >
            <MenuItem value="GET">GET</MenuItem>
            <MenuItem value="POST">POST</MenuItem>
            <MenuItem value="PUT">PUT</MenuItem>
            <MenuItem value="DELETE">DELETE</MenuItem>
          </TextField>
          <TextField
            label="Module"
            name="module"
            value={formData.module}
            onChange={handleInputChange}
            fullWidth
            select
            sx={{ mb: 2 }}
          >
            <MenuItem value="CART">CART</MenuItem>
            <MenuItem value="PRODUCT_REVIEW">PRODUCT_REVIEW</MenuItem>
            <MenuItem value="STORE_REVIEW">STORE_REVIEW</MenuItem>
            <MenuItem value="PRODUCT">PRODUCT</MenuItem>
            <MenuItem value="CATEGORY">CATEGORY</MenuItem>
            <MenuItem value="SUPPLIER">SUPPLIER</MenuItem>
            <MenuItem value="IMPORT_TICKET">IMPORT_TICKET</MenuItem>
            <MenuItem value="SERVICE">SERVICE</MenuItem>
            <MenuItem value="SERVICE_TICKET">SERVICE_TICKET</MenuItem>
            <MenuItem value="VOUCHER">VOUCHER</MenuItem>
            <MenuItem value="ORDER_TICKET">ORDER_TICKET</MenuItem>
            <MenuItem value="PERMISSION">PERMISSION</MenuItem>
            <MenuItem value="ROLE">ROLE</MenuItem>
            <MenuItem value="USER">USER</MenuItem>
          </TextField>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleFormSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity as any}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UpdatePermissionModal;
