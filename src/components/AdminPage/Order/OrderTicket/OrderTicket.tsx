import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  CalendarToday,
  AttachMoney,
  Person,
  Phone,
  Home,
  Add,
  Delete,
} from "@mui/icons-material";
import AddProductOrderModal from "./AddProductOrderModal";
import useVoucherStore from "../../../../zustand/useVoucherStore";
import { createSaleTicketAdmin } from "../../../../config/api";
const OrderTicket = ({ open, handleClose, onAdded }: any) => {
  // Define the type for rows
  type RowType = {
    id: number;
    productName: string;
    quantity: number;
    price: number;
    totalPrice: number;
  };

  const [rows, setRows] = useState<RowType[]>([]);
  const [openAddProductModal, setOpenAddProductModal] = useState(false);

  // Form state
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [voucher, setVoucher] = useState("");
  const [date, setDate] = useState("");
  const { vouchers } = useVoucherStore();
  const activeVouchers = vouchers.filter((voucher) => voucher.isActive);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // or "error"
  });
  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  const calculateTotal = () => {
    const subtotal = rows.reduce((sum, row) => sum + row.totalPrice, 0);

    if (voucher) {
      const selectedVoucher = activeVouchers.find((v) => v.name === voucher);
      if (selectedVoucher) {
        if (selectedVoucher.isPercentage) {
          return subtotal - (subtotal * selectedVoucher.discountValue) / 100;
        } else {
          return Math.max(0, subtotal - selectedVoucher.discountValue);
        }
      }
    }

    return subtotal;
  };

  const handleCreateOrderTicket = async () => {
    const productList = rows.map((row) => ({
      productName: row.productName,
      quantity: row.quantity,
    }));
    if (
      !customerName ||
      !address ||
      !phoneNumber ||
      !voucher ||
      !date ||
      productList.length == 0
    ) {
      setSnackbar({
        open: true,
        message: "Please fill all the fields and add at least 1 product.",
        severity: "error",
      });
      return;
    }

    try {
      const selectedVoucher = activeVouchers.find((v) => v.name === voucher);
      await createSaleTicketAdmin(
        customerName,
        phoneNumber,
        address,
        new Date(date).toISOString(),
        calculateTotal(),
        selectedVoucher?.id ?? 0,
        productList
      );

      setSnackbar({
        open: true,
        message: "Order ticket created successfully!",
        severity: "success",
      });

      setAddress("");
      setCustomerName("");
      setDate("");
      setPhoneNumber("");
      setVoucher("");
      setRows([]);

      handleClose();

      if (onAdded) {
        onAdded();
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error creating order ticket. Please try again.",
        severity: "error",
      });
    }
  };

  const handleAddProduct = (newProduct: Omit<RowType, "id">) => {
    setRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, ...newProduct },
    ]);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 700,
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          overflow: "hidden", // Ngăn cuộn bên ngoài modal
        }}
      >
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            Order Ticket
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenAddProductModal(true)}
          >
            Add Product
          </Button>
        </Box>

        {/* Content Section */}
        <Box
          sx={{
            flex: 1, // Đảm bảo phần nội dung co giãn để không tạo thanh cuộn ngoài ý muốn
            overflowY: "hidden",
            mt: 2,
          }}
        >
          {/* Form Fields */}
          <Box display="flex" gap={2} sx={{ flexWrap: "nowrap", mb: 2, mt: 1 }}>
            <TextField
              fullWidth
              label="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              variant="outlined"
              InputLabelProps={{
                shrink: true, // Đảm bảo rằng label luôn được hiển thị
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: "220px", height: "56px" }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value) && value.length <= 10) {
                  setPhoneNumber(value);
                }
              }}
              variant="outlined"
              InputLabelProps={{
                shrink: true, // Đảm bảo label luôn hiển thị
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone sx={{ fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: "220px", height: "56px" }}
            />
          </Box>
          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Home />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="voucher">Voucher</InputLabel>
              <Select
                labelId="voucher"
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
                label="Voucher"
              >
                {activeVouchers.map((voucher) => (
                  <MenuItem key={voucher.id} value={voucher.name}>
                    {voucher.isPercentage
                      ? voucher.name + " (-" + voucher.discountValue + "%)"
                      : voucher.name + " (-" + voucher.discountValue + "$)"}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarToday />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                min: new Date().toISOString().split("T")[0],
              }}
            />
            <TextField
              fullWidth
              label="Total"
              value={calculateTotal().toFixed(2)}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              margin="normal"
            />
          </Box>

          {/* Table Section */}
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: 300, // Giới hạn chiều cao của bảng
              overflowY: "auto", // Thanh cuộn chỉ nằm trong bảng
              mt: 2,
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.productName}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.totalPrice}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => {
                          setRows((prevRows) =>
                            prevRows.filter((r) => r.id !== row.id)
                          );
                        }}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 2,
            pt: 2,
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleCreateOrderTicket();
            }}
          >
            Save
          </Button>
        </Box>

        {/* Add Product Modal */}
        <AddProductOrderModal
          open={openAddProductModal}
          handleClose={() => setOpenAddProductModal(false)}
          handleSave={handleAddProduct}
        />
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
      </Box>
    </Modal>
  );
};

export default OrderTicket;
