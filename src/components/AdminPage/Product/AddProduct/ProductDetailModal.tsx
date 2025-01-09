import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
} from "@mui/material";

const ProductDetailModal = ({ show, onClose, product }: any) => {
  const baseURL = "http://localhost:8080";
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Dialog open={show} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle fontWeight={600}>Product Details</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Cột chứa các TextField */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                label="Name"
                value={product.name}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Description"
                value={product.description}
                multiline
                rows={7}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Price"
                value={product.price}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Category"
                value={product.category}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Brand"
                value={product.brand}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
          </Grid>

          {/* Cột chứa hình ảnh */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Main Image Display */}
              <Box
                component="img"
                src={baseURL + product.images[selectedIndex]}
                alt="Selected Product"
                sx={{
                  width: "100%",
                  aspectRatio: 1,
                  objectFit: "cover",
                  borderRadius: 5,
                  boxShadow: 3,
                }}
              />

              {/* Thumbnails */}
              <Grid container spacing={1}>
                {product.images.map(
                  (image: string | undefined, index: number) => (
                    <Grid
                      item
                      xs={3}
                      key={index}
                      onClick={() => setSelectedIndex(index)} // Update selected index
                      sx={{
                        cursor: "pointer",
                        borderRadius: 1,
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        component="img"
                        src={baseURL + image}
                        alt={`Thumbnail ${index}`}
                        sx={{
                          border:
                            selectedIndex === index
                              ? "4px solid #FFB6C1"
                              : "none", // Highlight selected thumbnail
                          aspectRatio: 1,
                          width: "100%",
                          objectFit: "cover",
                          borderRadius: 2,
                        }}
                      />
                    </Grid>
                  )
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button variant="contained" color="primary" onClick={onClose}>
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
