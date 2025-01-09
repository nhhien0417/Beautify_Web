import { useState, useEffect } from "react";
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
  Paper,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import ShortTextIcon from "@mui/icons-material/ShortText";
import PriceChangeIcon from "@mui/icons-material/PriceChange";

const ServiceDetailModal = ({ show, onClose, service }: any) => {
  const [serviceData, setServiceData] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
  });

  useEffect(() => {
    if (service) {
      setServiceData({
        name: service.name,
        price: service.price,
        description: service.description,
        image: service.image,
      });
    }
  }, [service]);

  const handleClose = () => {
    onClose();
    setServiceData({
      name: "",
      price: 0,
      description: "",
      image: "",
    });
  };

  return (
    <Dialog open={show} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle fontWeight={600}>Service Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          {/* Fields for name, price, and description */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={serviceData.name}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ShortTextIcon />
                  </InputAdornment>
                ),
                readOnly: true,
              }}
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={serviceData.price || ""}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PriceChangeIcon />
                  </InputAdornment>
                ),
                readOnly: true,
              }}
            />
            <TextField
              label="Description"
              name="description"
              value={serviceData.description}
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
                readOnly: true,
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
                {" "}
                <img
                  src={"http://localhost:8080" + serviceData.image}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" size="large">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceDetailModal;
