import { Box, createTheme, Grid, ThemeProvider } from "@mui/material";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import BrandFilter from "./BrandFilter";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
    fontWeightRegular: 500,
  },
});

const FilterProduct = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          sx={{
            border: "1px solid #ccc", // đường viền nhỏ
            borderRadius: "4px", // bo góc nhẹ
            backgroundColor: "#FEF9F2",
          }}
        >
          <CategoryFilter />
        </Box>
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#FEF9F2",
          }}
        >
          <PriceFilter />
        </Box>
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#FEF9F2",
          }}
        >
          <BrandFilter />
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default FilterProduct;
