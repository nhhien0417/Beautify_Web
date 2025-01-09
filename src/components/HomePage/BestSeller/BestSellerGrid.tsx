import { Box, Button, Grid2, Typography } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import BestSellerCard from "./BestSellerCard";
import useProductStore from "../../../zustand/useProductStore";
import { Link } from "react-router-dom";

const BestSellerGrid = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const { filteredProducts, setSortOption } = useProductStore();

  useEffect(() => {
    setSortOption("bestSelling");

    const calculateItemsPerPage = () => {
      const screenWidth = window.innerWidth;
      const itemsPerRow = Math.floor(screenWidth / 375);
      setItemsPerPage(itemsPerRow > 0 ? itemsPerRow : 1);
    };

    calculateItemsPerPage();
    window.addEventListener("resize", calculateItemsPerPage);

    return () => window.removeEventListener("resize", calculateItemsPerPage);
  }, []);

  const topProducts = filteredProducts.slice(0, 10);
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = topProducts.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(topProducts.length / itemsPerPage);

  const handlePageChange = (newPage: SetStateAction<number>) => {
    setPage(newPage);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setPage((prevPage) => (prevPage === totalPages ? 1 : prevPage + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [totalPages]);

  return (
    <Box p="40px 30px">
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" gap={2} alignItems="center">
          <Typography
            noWrap={true}
            variant="h3"
            component="h1"
            style={{ fontWeight: "bold", color: "#333" }}
          >
            Best Sellers
          </Typography>
        </Box>
        <Link to={"products"}>
          <Button
            variant="outlined"
            color="warning"
            style={{
              textTransform: "inherit",
              height: "40px",
              borderRadius: "20px",
              fontWeight: "bold",
            }}
          >
            <Typography noWrap={true}> View All Products</Typography>
          </Button>
        </Link>
      </Box>
      <Box>
        <Grid2
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingY: "50px",
            gap: "50px",
            flexWrap: "wrap",
          }}
        >
          {currentItems.map((product) => (
            <BestSellerCard key={product.id} product={product} />
          ))}
        </Grid2>
        <Box display="flex" justifyContent="center" paddingTop="20px" gap={0.5}>
          {[...Array(totalPages)].map((_, index) => (
            <Box
              key={index}
              onClick={() => handlePageChange(index + 1)}
              sx={{
                width: "30px",
                height: "3px",
                backgroundColor: page == index + 1 ? "#1976D2" : "#e0e0e0",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BestSellerGrid;
