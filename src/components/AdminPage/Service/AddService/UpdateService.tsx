import React, { useState, useEffect } from "react";
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
import DescriptionIcon from "@mui/icons-material/Description";
import ShortTextIcon from "@mui/icons-material/ShortText";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import { updateServiceAdmin } from "../../../../config/api"; // Ensure the correct import
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const UpdateServiceModal = ({
  open,
  service,
  onClose,
  onServiceUpdated,
}: any) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" or "error"
  });

  const [serviceData, setServiceData] = useState<{
    id: number;
    name: string;
    price: number;
    description: string;
    image: string | File;
  }>({
    id: -1,
    name: "",
    price: 0,
    description: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (service) {
      setServiceData({
        id: service.id,
        name: service.name,
        price: service.price,
        description: service.description,
        image: `http://localhost:8080${service.image}`,
      });
      setImagePreview(`http://localhost:8080${service.image}`);
    }
  }, [service]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setServiceData((prev) => ({
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
        setServiceData((prev) => ({
          ...prev,
          image: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    const { id, name, price, description, image } = serviceData;

    if (!name || !description || !price || !image) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields and upload an image.",
        severity: "error",
      });
      return;
    }

    try {
      const res = await updateServiceAdmin(
        id,
        name,
        price,
        description,
        typeof image === "string" ? new File([], image) : image
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
          message: "Service updated successfully!",
          severity: "success",
        });
        onClose();

        if (onServiceUpdated) {
          onServiceUpdated();
        }
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error updating service. Please try again.",
        severity: "error",
      });
      console.error("Error updating service", error);
    }
  };

  const handleClose = () => {
    onClose();
    setServiceData({
      id: -1,
      name: "",
      price: 0,
      description: "",
      image: "",
    });
    setImagePreview(null);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle fontWeight={600} fontSize={24}>
        Update Service
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          {/* Fields for name, price, and description */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={serviceData.name}
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
              value={serviceData.price || ""}
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
              value={serviceData.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={9}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Column for image upload */}
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
          onClick={handleUpdate}
          variant="contained"
          color="primary"
          size="large"
        >
          Update
        </Button>
      </DialogActions>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity as "success" | "error"}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default UpdateServiceModal;
