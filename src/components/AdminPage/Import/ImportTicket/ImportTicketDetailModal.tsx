import React from "react";
import {
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import { formatDate } from "../../../../services/date";

type ProductRow = {
  product: any;
  id: number;
  productName: string;
  quantity: number;
  price: number;
};

type ImportTicketDetailProps = {
  open: boolean;
  onClose: () => void;
  data: {
    supplier: string;
    date: string;
    total: number;
    status: string;
    listProducts: ProductRow[];
  };
};

const ImportTicketDetailModal: React.FC<ImportTicketDetailProps> = ({
  open,
  onClose,
  data,
}) => {
  console.log(data);
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        {/* Header */}
        <Typography variant="h6" fontWeight={600} mb={3}>
          Import Ticket Details
        </Typography>

        {/* Fields Section */}
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={4}>
          <TextField
            label="Supplier"
            value={data.supplier}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Date"
            value={formatDate(data.date)}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Total"
            value={data.total}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Status"
            value={data.status ? "Completed" : "Not Completed"}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Box>

        {/* Table Section */}
        <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.listProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.product.id}</TableCell>
                  <TableCell>{product.product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>
                    {product.product.unitPrice -
                      0.1 * product.product.unitPrice}
                  </TableCell>
                  <TableCell>
                    {product.quantity *
                      (product.product.unitPrice -
                        0.1 * product.product.unitPrice)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

export default ImportTicketDetailModal;
