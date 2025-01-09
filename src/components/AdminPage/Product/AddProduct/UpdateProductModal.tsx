import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import UploadImage from "./UploadImage";
import GeneralInformation from "./GeneralInformation";
import Pricing from "./Pricing";
import CategoryBrand from "./CategoryBrand";
import { useEffect, useState } from "react";
import { updateProduct } from "../../../../config/api";
import { brands } from "../../../../entities/Product";

const UpdateProductModal = ({
  show,
  onClose,
  product,
  onProductUpdated,
}: any) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" hoặc "error"
  });

  const [productData, setProductData] = useState({
    id: "",
    name: "",
    description: "",
    category: "",
    price: "",
    brand: "",
    images: [],
  });

  useEffect(() => {
    if (product) {
      setProductData({
        id: product.id || "",
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        price: product.price.toString() || "",
        brand: product.brand || "",
        images: product.images || [],
      });
    }
  }, [product]);

  const handleUpdateProductData = (field: any, value: any) => {
    setProductData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const { id, name, description, category, price, brand, images } =
      productData;

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
      const res = await updateProduct(
        +id,
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
          message: "Product updated successfully!",
          severity: "success",
        });
        onClose();

        if (onProductUpdated) {
          onProductUpdated();
        }
      }
    } catch (error) {
      // Hiển thị Snackbar thông báo lỗi
      setSnackbar({
        open: true,
        message: "Failed to update product. Please try again.",
        severity: "error",
      });

      console.error("Error updating product:", error);
    }
  };

  return (
    <Dialog open={show} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle fontWeight={600}>Update Product</DialogTitle>
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
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Box>
      </DialogContent>
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
    </Dialog>
  );
};

export default UpdateProductModal;
