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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";
import { CalendarToday, AttachMoney, Add, Delete } from "@mui/icons-material";
import AddProductModal from "./AddProductModal";
import {
  createImportTicketAdmin,
  getAllSuppliersActive,
} from "../../../../config/api";

const ImportTicket = ({ open, handleClose, onAdded }: any) => {
  type RowType = {
    id: number;
    productName: string;
    quantity: number;
    price: number;
    totalPrice: number;
  };

  const [rows, setRows] = useState<RowType[]>([]);
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  type SupplierType = {
    id: number;
    name: string;
  };

  const [suppliers, setSuppliers] = useState<SupplierType[]>([]);
  const [supplierId, setSupplierId] = useState("");
  const [date, setDate] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getAllSuppliersActive(1, 100);
        setSuppliers(response.data.result);
      } catch (error) {
        console.log("Error fetching suppliers:", error);
      }
    };

    if (open) fetchSuppliers();
  }, [open]);

  useEffect(() => {
    if (!open) {
      // Reset toàn bộ state khi modal đóng
      setRows([]);
      setSupplierId("");
      setDate("");
    }
  }, [open]);

  // Calculate total for all products
  const calculateTotal = () =>
    rows.reduce((sum, row) => sum + row.totalPrice, 0);

  // Handle adding a new product
  const handleAddProduct = (newProduct: {
    id: number;
    productName: string;
    quantity: number;
    price: number;
    totalPrice: number;
  }) => {
    setRows((prevRows) => [
      ...prevRows,
      {
        id: prevRows.length + 1,
        productName: newProduct.productName,
        quantity: newProduct.quantity,
        price: newProduct.price,
        totalPrice: newProduct.totalPrice,
      },
    ]);
  };

  const handleAddImportTicket = async () => {
    const products = rows.map((row) => ({
      productName: row.productName,
      importPrice: row.price,
      quantity: row.quantity,
    }));

    const selectedSupplier = suppliers.find(
      (supplier) => supplier.id === +supplierId
    );

    if (!date || !selectedSupplier || products.length == 0) {
      setSnackbar({
        open: true,
        message: "Please fill all the fields and add at least 1 product.",
        severity: "error",
      });
      return;
    }
    try {
      const formattedDate = new Date(date).toISOString();

      await createImportTicketAdmin(
        selectedSupplier.name,
        formattedDate,
        +calculateTotal(),
        products
      );

      onAdded();
      handleClose();
    } catch (error) {
      console.log(error);
    }
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
          display: "grid",
          gridTemplateRows: "auto 1fr auto", // Header, Content, Footer
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            Import Ticket
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
        <Box sx={{ overflowY: "auto", mb: 2 }}>
          {/* Form Fields */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="supplier-label">Supplier</InputLabel>
            <Select
              labelId="supplier-label"
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
              label="Supplier"
            >
              {suppliers.map((supplier) => (
                <MenuItem key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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

          {/* Full Width Table with scrollable area */}
          <TableContainer
            component={Paper}
            sx={{
              width: "100%",
              height: "calc(100% - 200px)", // Subtract the height of form and footer
              overflowY: "auto", // Enable vertical scrolling within table
              mt: 2,
            }}
          >
            <Table>
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
              handleAddImportTicket();
            }}
          >
            Save
          </Button>
        </Box>

        {/* Add Product Modal */}
        <AddProductModal
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

export default ImportTicket;
