import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import UploadImage from "./UploadImage";
import GeneralInformation from "./GeneralInformation";
import Pricing from "./Pricing";
import CategoryBrand from "./CategoryBrand";
import { useState } from "react";
import { createProduct } from "../../../../config/api";
import useProductStore from "../../../../zustand/useProductStore";

const AddNewProduct = ({ show, onClose, onProductAdded }: any) => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    brand: "",
    images: [],
  });

  const brands = useProductStore.getState().getAllBrands();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // or "error"
  });

  const handleUpdateProductData = (field: any, value: any) => {
    setProductData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCloseAddNewProduct = () => {
    setProductData({
      name: "",
      description: "",
      category: "",
      price: "",
      brand: "",
      images: [],
    });
    onClose();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  const handleSubmit = async () => {
    const { name, description, category, price, brand, images } = productData;

    if (
      !name ||
      !description ||
      !category ||
      !price ||
      !brand ||
      images.length != 4
    ) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields and upload full images.",
        severity: "error",
      });
      return;
    }

    try {
      const res = await createProduct(
        name,
        +price,
        images[0],
        images[1],
        images[2],
        images[3],
        brand,
        category,
        description
      );

      const statusCode = (res as unknown as { statusCode: number }).statusCode;
      if (statusCode === 400) {
        setSnackbar({
          open: true,
          message: "Product already exists.",
          severity: "error",
        });
      } else if (statusCode === 200) {
        setSnackbar({
          open: true,
          message: "Product created successfully!",
          severity: "success",
        });
        handleCloseAddNewProduct();

        if (onProductAdded) {
          onProductAdded(); // Fetch lại danh sách sản phẩm
        }
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error creating product. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Dialog
        open={show}
        onClose={handleCloseAddNewProduct}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle fontWeight={600}>Add New Product</DialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: "1fr 1fr", // Two columns layout
            }}
          >
            {/* First column for General Information and Category */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <GeneralInformation
                data={productData}
                onUpdate={handleUpdateProductData}
              />
              <CategoryBrand
                data={productData}
                onUpdate={handleUpdateProductData}
                brands={brands}
              />
            </Box>

            {/* Second column for Price and Upload Image */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <UploadImage
                data={productData.images}
                onUpdate={handleUpdateProductData}
              />
              <Pricing data={productData} onUpdate={handleUpdateProductData} />
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Add Product
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Snackbar for notifications */}
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
    </>
  );
};

export default AddNewProduct;
