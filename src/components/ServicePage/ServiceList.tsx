import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { useState } from "react";
import { ServiceCard } from "./ServiceCard";
import SearchFilter from "./ServiceSearch";
import useServiceStore from "../../zustand/useServiceStore";

const ServiceList = () => {
  const { filteredServices } = useServiceStore();
  const [currentPage, setCurrentPage] = useState(1);

  const servicesPerPage = 3;
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  const currentServices = filteredServices.slice(
    (currentPage - 1) * servicesPerPage,
    currentPage * servicesPerPage
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 100);
  };

  return (
    <Box
      sx={{
        width: "90%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ marginBottom: 3 }}
      >
        <Typography fontWeight={700} variant="h4">
          Services
        </Typography>
        <SearchFilter />
      </Grid>

      {/* Service List */}
      <Grid container spacing={3} justifyContent="center">
        {filteredServices.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
              width: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {currentServices.map((service) => (
              <Grid
                item
                key={service.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Link
                  to={`/services/${service.id}`}
                  state={{ service }}
                  style={{
                    textDecoration: "none",
                    display: "block",
                    width: "100%",
                  }}
                >
                  <ServiceCard service={service} />
                </Link>
              </Grid>
            ))}

            {Array.from({
              length: servicesPerPage - currentServices.length,
            }).map((_, index) => (
              <Grid item xs={12} sm={4} key={`empty-${index}`} />
            ))}
          </>
        )}
      </Grid>

      {/* Pagination */}
      {filteredServices.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default ServiceList;
