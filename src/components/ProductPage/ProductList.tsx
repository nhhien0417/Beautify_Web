import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Pagination,
} from "@mui/material";
import FilterProduct from "./Filter/FilterProduct";
import ProductGrid from "./Product/ProductGrid";
import SortFilter from "./Filter/SortFilter";
import SearchFilter from "./Filter/SearchFilter";
import useProductStore from "../../zustand/useProductStore";

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { products, filteredProducts, resetFilters, filters } =
    useProductStore();

  useEffect(() => {
    resetFilters();
  }, [resetFilters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

  const displayedProducts = filteredProducts?.length ? filteredProducts : [];
  const categoryTitle =
    filteredProducts.length === 0
      ? "Beauty Product"
      : filters.category || "Beauty Product";

  const totalPages = Math.ceil(displayedProducts.length / itemsPerPage);
  const paginatedProducts = displayedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

  if (products.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#FFFDEC", // Added white background
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "80%",
        margin: "0 auto",
        padding: 3,
        backgroundColor: "#FFFDEC", // Added white background
        borderRadius: 2, // Optional for rounded corners
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Optional for shadow
      }}
    >
      <Grid container spacing={2}>
        {/* Left: Title */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography fontWeight={700} variant="h4">
              {categoryTitle}
            </Typography>
            <Typography mt={1} variant="body2" sx={{ color: "#2266AA" }}>
              {displayedProducts.length}{" "}
              {displayedProducts.length > 1 ? "products" : "product"}
            </Typography>
          </Box>
        </Grid>

        {/* Right: Search and Sort Filters */}
        <Grid item xs={12} md={9}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <SearchFilter />
            </Grid>
            <Grid item>
              <SortFilter />
            </Grid>
          </Grid>
        </Grid>

        {/* Bottom-left: FilterProduct */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <FilterProduct />
          </Box>
        </Grid>

        {/* Bottom-right: ProductGrid */}
        <Grid item xs={12} md={9}>
          {paginatedProducts.length !== 0 ? (
            <ProductGrid products={paginatedProducts} />
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#FFFDEC",
                flexDirection: "column", // Arrange content vertically
              }}
            >
              <Typography variant="h6" color="textSecondary">
                No products match your search.
              </Typography>
            </Box>
          )}

          {/* Pagination */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 3,
            }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductList;
