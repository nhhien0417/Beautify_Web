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
  Alert,
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../../../config/api";

const AddProductOrderModal = ({ open, handleClose, handleSave }: any) => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [products, setProducts] = useState<
    {
      quantity: number;
      id: number;
      name: string;
      unitPrice: number;
    }[]
  >([]); // Danh sách dịch vụ từ API
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" hoặc "error"
  });
  useEffect(() => {
    if (open) {
      fetchProducts();
    }
  }, [open]);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts(1, 100);
      const productsData = response.data?.result || [];
      const acitveProducts = productsData.filter(
        (product: { quantity: number }) => product.quantity > 0
      );
      setProducts(acitveProducts);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Tính toán giá trị `Total Price`
  const totalPrice = Number(quantity) * Number(price);

  // Xử lý khi lưu sản phẩm
  const handleSubmit = () => {
    if (!productName || !quantity || !price || isNaN(totalPrice)) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        severity: "error",
      });
      return;
    }

    const selectedProduct = products.find(
      (product) => product.name === productName
    );

    handleSave({
      productName,
      quantity: Number(quantity),
      price: Number(price),
      totalPrice,
      productId: selectedProduct?.id, // Thêm ID của sản phẩm nếu cần
    });
    handleClose(); // Đóng modal sau khi lưu
    setProductName(""); // Reset form
    setQuantity("");
    setPrice("");
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
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" fontWeight={600} mb={2}>
            Add Product
          </Typography>
          {/* Product Name */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="product-select-label">Product Name</InputLabel>
            <Select
              labelId="product-select-label"
              value={productName}
              onChange={(e) => {
                const selectedName = e.target.value;
                setProductName(selectedName);

                // Lấy giá của sản phẩm được chọn
                const selectedProduct = products.find(
                  (product) => product.name === selectedName
                );
                if (selectedProduct) {
                  setPrice(selectedProduct.unitPrice); // Cập nhật giá
                }
              }}
              label="Product Name"
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.name}>
                  {product.name} ({product.quantity} available)
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Quantity */}
          <TextField
            fullWidth
            label="Quantity"
            value={quantity}
            onChange={(e) => {
              const inputQuantity = Number(e.target.value);

              if (
                (!isNaN(inputQuantity) || e.target.value === "") &&
                (inputQuantity <=
                  (products.find((product) => product.name === productName)
                    ?.quantity || 0) ||
                  e.target.value === "")
              ) {
                setQuantity(e.target.value);
              } else {
                setSnackbar({
                  open: true,
                  message: "Quantity exceeds available stock!",
                  severity: "error",
                });
              }
            }}
            variant="outlined"
            margin="normal"
          />
          {/* Price */}
          <TextField
            fullWidth
            label="Price"
            value={price}
            InputProps={{
              readOnly: true, // Làm trường chỉ đọc
            }}
            variant="outlined"
            margin="normal"
          />
          {/* Total Price */}
          <TextField
            fullWidth
            label="Total Price"
            value={totalPrice || ""}
            InputProps={{
              readOnly: true, // Làm trường chỉ đọc
            }}
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

export default AddProductOrderModal;
