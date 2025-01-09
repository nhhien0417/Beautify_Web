import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import ProductList from "../components/ProductPage/ProductList";

const darkTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#FFCFCF",
    },
    text: {
      primary: "#0B0B0B",
    },
  },
  typography: {
    fontFamily: "Poppins",
    fontWeightRegular: "500",
  },
});

const ProductPage = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Đặt lại CSS để đồng bộ với theme */}
      <Box
        sx={{
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <ProductList />
      </Box>
    </ThemeProvider>
  );
};

export default ProductPage;
