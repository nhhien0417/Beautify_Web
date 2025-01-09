import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  InputAdornment,
  Box,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DescriptionIcon from "@mui/icons-material/Description";
import ShortTextIcon from "@mui/icons-material/ShortText";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import { createServiceAdmin } from "../../../../config/api"; // Đảm bảo đường dẫn chính xác

const AddNewService = ({ open, onClose, onServiceAdded }: any) => {
  const [newService, setNewService] = useState<{
    name: string;
    price: number;
    description: string;
    image: File | null;
  }>({
    name: "",
    price: 0,
    description: "",
    image: null,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // or "error"
  });
  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewService((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setNewService((prev) => ({
          ...prev,
          image: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseAddNewService = () => {
    setNewService({
      name: "",
      price: 0,
      description: "",
      image: null,
    });
    setImagePreview(null);
    onClose();
  };

  const handleAdd = async () => {
    const { name, price, description, image } = newService;

    if (!name || !description || !price || !image) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields and upload image.",
        severity: "error",
      });
      return;
    }

    try {
      const res = await createServiceAdmin(
        name,
        price,
        description,
        description,
        image
      );

      const statusCode = (res as unknown as { statusCode: number }).statusCode;
      if (statusCode === 400) {
        setSnackbar({
          open: true,
          message: "Service already exists.",
          severity: "error",
        });
      } else if (statusCode === 200) {
        setSnackbar({
          open: true,
          message: "Service created successfully!",
          severity: "success",
        });
        handleCloseAddNewService();

        if (onServiceAdded) {
          onServiceAdded(); // Fetch lại danh sách sản phẩm
        }
      }
    } catch (error) {
      console.error("Error creating service", error);
    }
  };

  const handleClose = () => {
    setNewService({
      name: "",
      price: 0,
      description: "",
      image: null,
    });
    setImagePreview(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle fontWeight={600} fontSize={24}>
        Add New Service
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          {/* Cột chứa các trường nhập liệu */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={newService.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ShortTextIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={newService.price || ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PriceChangeIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Description"
              name="description"
              value={newService.description}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              multiline
              rows={9}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Cột upload ảnh */}
          <Grid item xs={12} sm={6} mt={2}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Paper
                variant="outlined"
                sx={{
                  width: "100%",
                  aspectRatio: 1,
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2px dashed gray",
                  backgroundColor: "#f9f9f9",
                  overflow: "hidden",
                }}
              >
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <IconButton
                      color="primary"
                      component="label"
                      sx={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                        },
                      }}
                    >
                      <AddPhotoAlternateIcon />
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    color="primary"
                    component="label"
                    sx={{
                      position: "absolute",
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      },
                    }}
                  >
                    <AddPhotoAlternateIcon fontSize="large" />
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </IconButton>
                )}
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" size="large">
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          variant="contained"
          color="primary"
          size="large"
        >
          Add
        </Button>
      </DialogActions>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity as "success" | "error"}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default AddNewService;
