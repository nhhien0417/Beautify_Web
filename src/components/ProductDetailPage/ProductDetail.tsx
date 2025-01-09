import { Box, createTheme, Divider, ThemeProvider } from "@mui/material";
import MainProduct from "./MainProduct/MainProduct";
import Product from "../../entities/Product";
import TabProductInfo from "./Tabs/TabProductInfo";
import Reviews from "./Reviews/Reviews";
import GuaranteeGrid from "../HomePage/Guarantee/GuaranteeGrid";

export interface PropProduct {
  product: Product;
}

const DividerSection = () => (
  <Divider
    sx={{ width: "90%", margin: "0 auto", borderBottomWidth: 2, marginY: 6 }}
  />
);

const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
});

const ProductDetail = ({ product }: PropProduct) => {
  return (
    <ThemeProvider theme={theme}>
      <Box px={3} pt={3} justifyContent="center" alignItems="center">
        <MainProduct product={product} />
        <TabProductInfo product={product} />
        <DividerSection />
        <GuaranteeGrid />
        <DividerSection />
        <Reviews product={product} />
        <DividerSection />
      </Box>
    </ThemeProvider>
  );
};

export default ProductDetail;
