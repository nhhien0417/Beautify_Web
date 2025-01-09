import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../../../config/api";

const AddProductModal = ({ open, handleClose, handleSave }: any) => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState<{ id: number; name: string; unitPrice: number }[]>([]);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "error" | "success";
  }>({
    open: false,
    message: "",
    severity: "error",
  });

  useEffect(() => {
    if (open) {
      fetchServices();
    }
  }, [open]);

  const fetchServices = async () => {
    try {
      const response = await getAllProducts(1, 100);
      const productsData = response.data?.result || [];
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const totalPrice = Number((Number(quantity) * Number(price)).toFixed(2));

  const handleSubmit = () => {
    if (!productName) {
      showSnackbar("Please select a product.", "error");
      return;
    }

    if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      showSnackbar("Please enter a valid quantity greater than 0.", "error");
      return;
    }

    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      showSnackbar("Price must be valid and greater than 0.", "error");
      return;
    }

    if (isNaN(totalPrice) || totalPrice <= 0) {
      showSnackbar("Total Price is invalid.", "error");
      return;
    }

    const selectedProduct = products.find(
      (product) => product.name === productName
    );

    handleSave({
      productName,
      quantity: Number(quantity),
      price: Number(price).toFixed(2),
      totalPrice,
      productId: selectedProduct?.id,
    });

    showSnackbar("Product added successfully!", "success");
    handleClose();
    setProductName("");
    setQuantity("");
    setPrice("");
  };

  const showSnackbar = (message: string, severity: "error" | "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
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
          <Typography variant="h6" fontWeight={600} mb={2}>
            Add Product
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="product-select-label">Product Name</InputLabel>
            <Select
              labelId="product-select-label"
              value={productName}
              onChange={(e) => {
                const selectedName = e.target.value;
                setProductName(selectedName);

                const selectedProduct = products.find(
                  (product) => product.name === selectedName
                );
                if (selectedProduct) {
                  setPrice(
                    (
                      selectedProduct.unitPrice -
                      0.1 * selectedProduct.unitPrice
                    ).toString()
                  );
                }
              }}
              label="Product Name"
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.name}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Quantity"
            value={quantity}
            onChange={(e) => {
              if (!isNaN(Number(e.target.value)) || e.target.value === "") {
                setQuantity(e.target.value);
              }
            }}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Price"
            value={price}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Total Price"
            value={totalPrice || ""}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            margin="normal"
          />
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddProductModal;
