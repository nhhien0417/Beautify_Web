import { useEffect, useState } from "react";
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
  Snackbar,
  Alert,
} from "@mui/material";
import {
  CalendarToday,
  AttachMoney,
  Person,
  Phone,
  Add,
  Delete,
} from "@mui/icons-material";
import AddServiceModal from "./AddServiceModal";
import { bookingServiceAdmin } from "../../../../config/api";

const ServiceTicket = ({ open, handleClose, onAdded }: any) => {
  type RowType = {
    id: number;
    productName: string;
    price: number;
  };

  const [rows, setRows] = useState<RowType[]>([]);
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const calculateTotal = () => rows.reduce((sum, row) => sum + row.price, 0);

  useEffect(() => {
    if (!open) {
      setRows([]);
      setCustomerName("");
      setPhoneNumber("");
      setDate("");
    }
  }, [open]);

  const handleAddProduct = (newProduct: Omit<RowType, "id">) => {
    setRows((prevRows) => [
      ...prevRows,
      {
        id: prevRows.length + 1,
        ...newProduct,
      },
    ]);
  };

  const handleAddServiceTicket = async () => {
    const services = rows.map((row) => [row.productName]);
    if (!customerName || !phoneNumber || !date || services.length == 0) {
      setSnackbar({
        open: true,
        message: "Please fill all the fields and add at least 1 service.",
        severity: "error",
      });
      return;
    }
    try {
      const formattedDate = new Date(date).toISOString();
      await bookingServiceAdmin(
        customerName,
        phoneNumber,
        formattedDate,
        +calculateTotal(),
        services
      );

      setSnackbar({
        open: true,
        message: "Service ticket created successfully!",
        severity: "success",
      });

      if (onAdded) {
        onAdded();
      }
      handleClose();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Please fill all the fields and add at least 1 service.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
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
            overflow: "hidden",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight={600}>
              Service Ticket
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenAddProductModal(true)}
            >
              Add Service
            </Button>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: "hidden",
              mt: 2,
            }}
          >
            <Box
              display="flex"
              gap={2}
              sx={{ flexWrap: "nowrap", mb: 2, mt: 1 }}
            >
              <TextField
                fullWidth
                label="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
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
                  shrink: true,
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
                value={calculateTotal()}
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

            <TableContainer
              component={Paper}
              sx={{
                maxHeight: 300,
                overflowY: "auto",
                mt: 2,
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Service Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.productName}</TableCell>
                      <TableCell>{row.price}</TableCell>
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
              onClick={handleAddServiceTicket}
            >
              Save
            </Button>
          </Box>

          <AddServiceModal
            open={openAddProductModal}
            handleClose={() => setOpenAddProductModal(false)}
            handleSave={handleAddProduct}
          />
        </Box>
      </Modal>

      {/* Snackbar for confirmation */}
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
  );
};

export default ServiceTicket;
