import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetailPage/ProductDetail";
import { Box, CircularProgress } from "@mui/material";
import useProductStore from "../zustand/useProductStore";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const products = useProductStore((state) => state.products);
  const product = products.find((p) => p.id === Number(productId)) || null;

  if (!product) {
    return (
      <Box
        sx={{
          textAlign: "center",
          marginTop: "20vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return <ProductDetail product={product} />;
};

export default ProductDetailPage;
