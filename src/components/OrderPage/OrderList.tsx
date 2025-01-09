import React, { useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
  Paper,
  Chip,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import useSaleTicketStore from "../../zustand/useSaleTicketStore";
import { formatDate } from "../../services/date";
import { Link } from "react-router-dom";

const OrdersList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;
  const { saleTickets, totalTickets } = useSaleTicketStore();

  const ordersTheme = createTheme({
    typography: {
      fontFamily: "Montserrat, Arial, sans-serif",
    },
  });

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  // Tính toán các đơn hàng cần hiển thị cho trang hiện tại
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentOrders = saleTickets.slice(startIndex, endIndex);

  return (
    <ThemeProvider theme={ordersTheme}>
      <Box paddingTop={2}>
        {/* Order List */}
        <Box
          sx={{
            padding: 4,
            maxWidth: 1000,
            margin: "0 auto",
            backgroundColor: "#EFF3EA",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: "bold",
              marginBottom: 3,
              textAlign: "center",
            }}
          >
            Order History
          </Typography>
          <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Order ID
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Order Date
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Status
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentOrders.length > 0 ? (
                  currentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell align="center">{order.id}</TableCell>
                      <TableCell align="center">
                        {formatDate(order.date)}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color:
                            order.status === "COMPLETED"
                              ? "#88C273"
                              : order.status === "PREPARING"
                                ? "#FEEE91"
                                : "#A2D2DF",
                        }}
                      >
                        <Chip
                          label={order.status}
                          sx={{
                            backgroundColor:
                              order.status === "COMPLETED"
                                ? "#88C273"
                                : order.status === "PREPARING"
                                  ? "#FEEE91"
                                  : "#A2D2DF",
                            color: "black",
                            fontWeight: "bold",
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Link
                          key={order.id}
                          to={`/orders/${order.id}`}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            display: "block",
                          }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                          >
                            View Details
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell align="center" colSpan={4}>
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Pagination
              count={Math.ceil(totalTickets / pageSize)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default OrdersList;
